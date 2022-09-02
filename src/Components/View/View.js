import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../Contexts/FirebaseContext';
import { PostContext } from '../../Contexts/PostContext';

import './View.css';
function View() {
  const { postDetails } = useContext(PostContext)
  const [seller, setSeller] = useState()
  const { FirebaseInit } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  useEffect(() => {
    const { userId } = postDetails
    FirebaseInit.firestore().collection('webusers').where('id', '==', userId).get().then((result) => {
      result.forEach(doc => {
        console.log(doc.data());
        setSeller(doc.data())
      });
    })
  }, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv mx-auto">
        <img src={postDetails.url} alt="product_image" />
      </div>
      <div className="rightSection">
        <div className="productDetails p-3">
          <p>&#x20B9; {postDetails.price}/- </p>
          <span>Product: {postDetails.name}</span>
          <p>Category: {postDetails.category}</p>
          <p>Posted On: {postDetails.postDate}</p>
        </div>
        {seller && <div className="contactDetails p-3">
          <p>Seller Details</p>
          <p>Name: {seller.username}</p>
          {user ? <p>Phone: {seller.phone}</p> : <Link to='/login'>Login Here to Contact Seller </Link>}
        </div>}
      </div>
    </div>
  )
}
export default View;
