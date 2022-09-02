import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../Contexts/FirebaseContext';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const route = useHistory()
  const [image, setImage] = useState(null)
  const [name, setItemName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const { FirebaseInit } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  function disable() {
    document.getElementById('submit').hidden = true
  }
  function enable() {
    document.getElementById('submit').hidden = false
  }
  function productSubmit(e) {
    // console.log(e)
    e.preventDefault()
    document.getElementById('loading').classList.add('loader') // used old method to test  
    FirebaseInit.storage().ref(`/productImages/${name + image.name}`).put(image).then((result) => {
      result.ref.getDownloadURL().then((url) => {
        console.log(url);
        FirebaseInit.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          postDate: new Date().toLocaleString()
        })
        route.push('/')
        alert('upload complete')
      })
    })
  }
  return (
    <Fragment>
      <Header />
      {/* <card> */}
      <div className="centerDiv text-center">
        <h3 className='p-1 serif'>Upload Item</h3>
        <form action="" onSubmit={productSubmit}>
          <label className="label">Item Name</label>
          <br />
          <input
            required
            className="input"
            type="text"
            onChange={(e) => {setItemName(e.target.value);enable()}}
            value={name}
            name="Name"
            placeholder="Name & Model Number"
          />
          <br />
          <label className="label">Category</label>
          <br />
          <input
            required
            className="input"
            type="text"
            onChange={(e) => {setCategory(e.target.value);enable()}}
            value={category}
            name="category"
            placeholder="Building/Vehicle/Electronics"
          />
          <br />
          <label className="label">Price</label>
          <br />
          <input onChange={(e) => {setPrice(e.target.value);enable()}}
            value={price} required className="input" type="number" name="price" placeholder="Price in Your Currency" />
          <br />
          <br />
          <div className="flex text-center">
            <img alt="Uploaded Image" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input required type="file" name='image' onChange={(e) => { setImage(e.target.files[0]);enable() }} />
            <br />
            <button type='submit' id='submit' onClick={disable} className="uploadBtn">Upload and Submit</button>
            <div id='loading' className=" m-2 p-2 mx-auto"></div>
          </div>
        </form>
      </div>
      {/* </card> */}
    </Fragment>
  );
};

export default Create;
