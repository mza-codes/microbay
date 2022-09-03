import { Grid } from '@mui/material';
import { Container } from '@mui/system';
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
  // return (
  //   <Container >
  //     <Grid xs={8} >
  //       <div id="carouselExampleIndicators" class="carousel slide " data-ride="carousel">
  //         <ol class="carousel-indicators">
  //           <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
  //           <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
  //           <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  //         </ol>
  //         <div class="carousel-inner ">
  //           <div class="carousel-item active">
  //             <img class="imageShowDiv w-100" src={postDetails.url} alt="product_image" />
  //           </div>
  //           <div class="carousel-item">
  //             <img class="imageShowDiv w-100" src={postDetails.url} alt="Second slide" />
  //           </div>
  //           <div class="carousel-item">
  //             <img class="imageShowDiv w-100" src={postDetails.url} alt="Third slide" />
  //           </div>
  //           <div class="carousel-caption d-none d-md-block times">
  //             <h5>{postDetails.name}</h5>
  //             <p>{postDetails.category}</p>
  //             {/* <p>Posted On: {postDetails.postDate}</p>
  //           <p>&#x20B9; {postDetails.price}/- </p> */}
  //           </div>
  //         </div>
  //         <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
  //           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  //           <span class="sr-only">Previous</span>
  //         </a>
  //         <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
  //           <span class="carousel-control-next-icon" aria-hidden="true"></span>
  //           <span class="sr-only">Next</span>
  //         </a>
  //       </div>
  //     </Grid>
  //     <Grid container spacing={2}>
  //       <Grid item xs={8}>
  //         {/* <Item>xs=8</Item> */}
  //       </Grid>
  //       <Grid item xs={4}>
  //         {/* <Item>xs=4</Item> */}
  //       </Grid>
  //       <Grid item xs={4}>
  //         {/* <Item>xs=4</Item> */}
  //       </Grid>
  //       <Grid item xs={8}>
  //         {/* <Item>xs=8</Item> */}
  //       </Grid>
  //     </Grid>
  //   </Container>

  // )
}
export default View;
