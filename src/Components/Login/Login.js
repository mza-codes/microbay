import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../Contexts/FirebaseContext';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  // const {setUser} = useContext(AuthContext)
  const {FirebaseInit} = useContext(FirebaseContext)
  // useEffect(()=>{
  //   FirebaseInit.onAuthStateChanged((user)=>{
  //     setUser(user)
  //     console.log('USERS SET COMPLETE');
  //   })
  // })
  const route = useHistory()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  // const {FirebaseInit} = useContext(FirebaseContext)
  const handleLogin =(e)=>{
    e.preventDefault()
    FirebaseInit.auth().signInWithEmailAndPassword(email,password).then((result)=>{
      console.log('logging user after login');
      console.log(result.user);
      // setUser(result.user)
      route.push('/')
    }).catch((err)=>alert(err.message))
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
            name="email"
            placeholder="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            name="password"
            placeholder="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{route.push('/signup')}} >Signup</a>
        <a onClick={()=>{route.push('/')}} >Home</a>
      </div>
    </div>
  );
}

export default Login;
