import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Contexts/FirebaseContext';
import { useHistory } from 'react-router-dom';
// import { FirebaseInit } from '../../firebase/config';
function Header() {
  const { user } = useContext(AuthContext)
  const { FirebaseInit } = useContext(FirebaseContext)
  const route = useHistory()
  let create = '/login'
  user ?  create = '/create' : create ='/login'
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>route.push('/')} className="brandName">
          <OlxLogo ></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? <span>Welcome   {user.displayName} </span> : 
          <span className='pointer' onClick={() => {route.push('/login')}}>Login</span> }
          <hr />
        </div>
        <div className='pointer'>
          <span onClick={() => {
            FirebaseInit.auth().signOut();
            route.push('/login')
          }} >{user && 'Logout'}</span>
        </div>

        <div onClick={()=>route.push(create)} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
