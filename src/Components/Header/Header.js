import React, { useContext, useState } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Contexts/FirebaseContext';
import { useHistory } from 'react-router-dom';
import { SearchResult } from '../../Contexts/ResultContext'
import ErrorIcon from '@mui/icons-material/Error';
import { CircularProgress } from '@mui/material';
// import { FirebaseInit } from '../../firebase/config';
function Header() {
  const { user } = useContext(AuthContext)
  const { FirebaseInit } = useContext(FirebaseContext)
  const [query, setQuery] = useState('')
  const { setResult } = useContext(SearchResult)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [result,setResult] = useState([])
  const route = useHistory()
  function handleSearch(e) {
    e.preventDefault()
    console.log(query);
    try {
      FirebaseInit.firestore().collection('products').where('price', '==', query).get().then((result) => {
        if (result.docs.length === 0) {
          console.log('no data found')
          setNotFound(true)
        } else {
          setLoading(true)
          let searchRes = []
          result.forEach(doc => {
            searchRes.push(doc.data())
          })
          searchRes.query = query
          setResult(searchRes)
          route.push('/results')
          setLoading(false)
        }
      }).catch((err) => { console.log(err) })
    } catch (error) {
      alert(error)
    }
    FirebaseInit.firestore().collection('products').where('category', '==', query).get().then((result) => {
      if (result.docs.length === 0) {
        console.log('no data found')
        setNotFound(true)
      } else {
        setLoading(true)
        let searchRes = []
        result.forEach(doc => {
          searchRes.push(doc.data())
        })
        searchRes.query = query
        setResult(searchRes)
        route.push('/results')
        setLoading(false)
      }
    }).catch((err) => { console.log(err) })
  }

  let create = '/login'
  user ? create = '/create' : create = '/login'
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={() => route.push('/')} className="brandName">
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
              onChange={(e) => { setQuery(e.target.value);setNotFound(false) }}
              value={query}
            />
          </div>
          {loading && <CircularProgress className='p-2 m-1' color='success' />}
          {notFound && <ErrorIcon className='m-2' color='warning' ></ErrorIcon>}
          <div onClick={handleSearch} className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? <span>Welcome   {user.displayName} </span> :
            <span className='pointer' onClick={() => { route.push('/login') }}>Login</span>}
          <hr />
        </div>
        <div className='pointer'>
          <span onClick={() => {
            FirebaseInit.auth().signOut();
            route.push('/login')
          }} >{user && 'Logout'}</span>
        </div>

        <div onClick={() => route.push(create)} className="sellMenu">
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
