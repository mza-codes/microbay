import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../Contexts/FirebaseContext';
import { useHistory } from 'react-router-dom';
import { Button, IconButton, Select } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Create = () => {
  const route = useHistory()
  const [image, setImage] = useState(null)
  const [name, setItemName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const { FirebaseInit } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  function disable() {
    document.getElementById('submit').hidden = true
  }
  function enable() {
    document.getElementById('submit').hidden = false
  }
  function productSubmit(e) {
    // console.log(e)
    console.log('logging data');
    console.log(name,category,price);
    console.log(image)
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
            onChange={(e) => { setItemName(e.target.value); enable() }}
            value={name}
            name="Name"
            placeholder="Name & Model Number"
          />
          <br />

          <div>
            {/* <Select
              id="Select-42"
              multiple={false}
              onChange={(e) => { setCategory(e.target.value);console.log(category); enable() }}
              options={{
                classes: '',
                dropdownOptions: {
                  alignment: 'left',
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250
                }
              }}
              defaultValue=''
            > */}
            <select name="category" onChange={(e) => { setCategory(e.target.value);console.log(category); enable() }}  id="">
              <option disabled >Choose your option </option>
              <option value="Electronics">Electronics</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Buildings">Buildings </option>
              <option value="Property">Property</option>
              <option value="Bikes"> Bikes </option>
              <option value="Cars"> Cars </option>
              <option value="Laptop"> Laptop </option>
              <option value="Cycles"> Cycles </option>
              <option value="Other"> Other </option>
              {/* </Select> */}
            </select>
          </div>

          {/* <label className="label">Category</label>
          <br />
          <input
            required
            className="input"
            type="text"
            onChange={(e) => { setCategory(e.target.value); enable() }}
            value={category}
            name="category"
            placeholder="Building/Vehicle/Electronics"
          /> */}
          <br />
          <label className="label">Price</label>
          <br />
          <input onChange={(e) => { setPrice(e.target.value); enable() }}
            value={price} required className="input" type="number" name="price" placeholder="Price in Your Currency" />
          <br />
          <br />

          {/* material ui test start */}
          <Button variant="contained" component="label">
            Upload
            <input required hidden onChange={(e) => { setImage(e.target.files[0]); enable() }}  multiple type="file" />
          </Button>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input required hidden onChange={(e) => { setImage(e.target.files[0]); enable() }}  type="file" />
            <PhotoCamera />
          </IconButton>
          {/* material ui test close */}

          <div className="mt-3 flex text-center">
            <img className='viewImg' alt="Uploaded Image" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            {/* <br />
            <input required type="file" name='image' onChange={(e) => { setImage(e.target.files[0]); enable() }} />
            <br /> */}
            <button type='submit' id='submit' onClick={(e)=>{productSubmit(e);disable()}} className="uploadBtn">Upload and Submit</button>
            <div id='loading' className=" m-2 p-2 mx-auto"></div>
          </div>
        </form>
      </div>
      {/* </card> */}
    </Fragment>
  );
};

export default Create;
