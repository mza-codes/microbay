import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Heart from '../../assets/Heart';
import { AuthContext, FirebaseContext } from '../../Contexts/FirebaseContext';
import { PostContext } from '../../Contexts/PostContext';
import './Post.css';

function Posts() {
  const [products, setProducts] = useState([])
  const { FirebaseInit } = useContext(FirebaseContext)
  const { setPostDetails } = useContext(PostContext)
  const ref = useRef(null);
  const route = useHistory()
  useEffect(() => {
    FirebaseInit.firestore().collection('products').get().then((snapshot) => {
      const allProducts = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allProducts)
    })
  }, [])
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Latest Updates</span>
          <span>View more &gt;</span>
        </div>
        <div className="cards">
          {products.map((product, i) => {
            let date = product.postDate
            let result = date.slice(0, 10);
            product.date = result
            return (
              <div key={i} className="card"
                onClick={() => {
                  setPostDetails(product)
                  route.push('/view')
                }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price} /-</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                  <span className="date">{product.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
