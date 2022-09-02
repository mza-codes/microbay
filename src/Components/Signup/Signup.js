import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../Contexts/FirebaseContext';

import Logo from '../../olx-logo.png';
import './Signup.css';



export default function Signup() {
  const route = useHistory()
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { FirebaseInit } = useContext(FirebaseContext)
  const [loader, setLoader] = useState(false)
  function disable() {
    document.getElementById('submit').hidden = true
  }
  function enable() {
    document.getElementById('submit').hidden = false
  }
  const handleSignup = (e) => {
    e.preventDefault()
    document.getElementById('loading').classList.add('loader')
    console.log(username, email, password)
    console.log(FirebaseInit)
    FirebaseInit.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      console.log('logging result');
      console.log(result.user)
      result.user.updateProfile({ displayName: username }).then(() => {
        FirebaseInit.firestore().collection('webusers').add({
          id: result.user.uid,
          username: username,
          email,
          phone
        }).then(() => {
          route.push('/login')
          alert('success');
        })
      }).catch((err) => console.log(err))

    }).catch((err) => { alert(err.message ? err.message : err.code); console.log('ERROR OCCURED'); console.log(err) })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSignup} >
          <label htmlFor="fname">Username</label>
          <br />
          <input required
            className="input"
            type="text"
            onChange={(e) => { setUserName(e.target.value); enable() }}
            value={username}
            id="fname"
            name="name"
            placeholder="John"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input required
            className="input"
            type="email"
            onChange={(e) => { setEmail(e.target.value); enable() }}
            value={email}
            id="email"
            name="email"
            placeholder="John"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input required
            className="input"
            type="number"
            onChange={(e) => { setPhone(e.target.value); enable(false) }}
            value={phone}
            id="phone"
            name="phone"
            placeholder="Doe"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input required
            className="input"
            type="password"
            onChange={(e) => { setPassword(e.target.value); enable() }}
            value={password}
            id="password"
            name="password"
            placeholder="Doe*/46"
          />
          <br />
          <br />
          <button id='submit' onClick={disable} >Signup</button>
          <div id='loading' className=" m-2 p-2 mx-auto"></div>
        </form>
        <Link to='/login' >Login</Link>
      </div>
    </div>
  );
}
