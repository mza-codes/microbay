import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import SendIcon from '@mui/icons-material/Send';

import Logo from '../../olx-logo.png';
import './Signup.css';



export default function Signup() {
  const route = useHistory()
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { FirebaseInit } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)
  const [pwdLength, setPwdLength] = useState(false)
  const [message, setMessage] = useState('')
  const handleSignup = (e) => {
    setLoading(true)
    e.preventDefault()
    let emailvalid = false
    if (email.length >= 6) {
      emailvalid = true
      console.log('logging emailvalid status', emailvalid)
    } else {
      emailvalid = false
      console.log('email not ok', emailvalid)
      setPwdLength(true)
      setMessage('*Invalid Email Address')
      setLoading(false)
    }
    if (emailvalid) {
      let uservalid = false
      if (username.length <= 15 && username.length >= 4) {
        uservalid = true
        console.log('user ok', uservalid)
      } else {
        uservalid = false
        console.log('user not ok', uservalid)
        setPwdLength(true)
        setMessage('*Invalid UserName')
        setLoading(false)
      }
      if (uservalid) {
        let validphone = false
        if (phone.length <= 13 && phone.length >= 10) {
          validphone = true
          console.log('phone ok', validphone)
        } else {
          validphone = false
          console.log('phone not ok', validphone)
          setPwdLength(true)
          setMessage('*Mobile No. must be at least of 10 characters')
          setLoading(false)
        }

        if (validphone) {
          let validpwd = false
          if (password.length >= 5) {
            validpwd = true
            console.log('password ok', validpwd)
            validpwd &&
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
                    route.push('/')
                  })
                }).catch((err) => { setLoading(false); console.log(err) })

              }).catch((err) => { alert(err.message ? err.message : err.code); setLoading(false); console.log('ERROR OCCURED'); console.log(err) })
          } else {
            validpwd = false
            console.log('password ok', validpwd)
            setPwdLength(true)
            setMessage('Password must be more than 4 Characters Long')
            setLoading(false)
          }
        }
      }
    }
  }
  // return (
  //   <div>
  //     <div className="signupParentDiv">
  //       <img width="200px" height="200px" src={Logo}></img>
  //       <form onSubmit={handleSignup} >
  //         <label htmlFor="fname">Username</label>
  //         <br />
  //         <input required
  //           className="input"
  //           type="text"
  //           onChange={(e) => { setUserName(e.target.value); enable() }}
  //           value={username}
  //           id="fname"
  //           name="name"
  //           placeholder="John"
  //         />
  //         <br />
  //         <label htmlFor="email">Email</label>
  //         <br />
  //         <input required
  //           className="input"
  //           type="email"
  //           onChange={(e) => { setEmail(e.target.value); enable() }}
  //           value={email}
  //           id="email"
  //           name="email"
  //           placeholder="John"
  //         />
  //         <br />
  //         <label htmlFor="phone">Phone</label>
  //         <br />
  //         <input required
  //           className="input"
  //           type="number"
  //           onChange={(e) => { setPhone(e.target.value); enable(false) }}
  //           value={phone}
  //           id="phone"
  //           name="phone"
  //           placeholder="Doe"
  //         />
  //         <br />
  //         <label htmlFor="password">Password</label>
  //         <br />
  //         <input required
  //           className="input"
  //           type="password"
  //           onChange={(e) => { setPassword(e.target.value); enable() }}
  //           value={password}
  //           id="password"
  //           name="password"
  //           placeholder="Doe*/46"
  //         />
  //         <br />
  //         <br />
  //         <button id='submit' onClick={disable} >Signup</button>
  //         <div id='loading' className=" m-2 p-2 mx-auto"></div>
  //       </form>
  //       <Link to='/login' >Login</Link>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <div className="container">
        <h1 className='text-center p-3 m-3 times '>SignUp</h1>
        <hr />
        <div className='row mt-3 login'>
          <img width="300px" height="300px" src={Logo}></img>
          <TextField required onChange={(e) => { setUserName(e.target.value); setLoading(false) }}
            type="text" value={username}
            label="UserName" color="secondary" variant="filled" focused />
          <TextField required onChange={(e) => { setEmail(e.target.value); setLoading(false) }}
            type="email" value={email}
            label="Email" color="primary" variant="filled" focused />
          <TextField required onChange={(e) => { setPhone(e.target.value); setLoading(false) }}
            type="number" value={phone}
            label="Mobile" color="success" variant="filled" focused />
          <TextField required onChange={(e) => { setPassword(e.target.value); setLoading(false) }}
            type="password" value={password}
            label="Password" variant="filled" color="warning" focused />
          {pwdLength && <p id='pwdLength' className='times' style={{ color: 'red', fontSize: '15px' }} >
            {message} </p>}
          <div>
            {/* <Box sx={{ '& > button': { m: 1 } }}> */}
            <LoadingButton
              id='submit'
              color="secondary"
              onClick={(e) => { setLoading(true); handleSignup(e) }}
              loading={loading}
              loadingPosition="end"
              endIcon={<SendIcon />}
              variant="contained">
              SignUp
            </LoadingButton>
            <br />

            {/* </Box> */}
          </div>
          <Button onClick={() => route.push('/login')} color='warning' variant="contained" component="label">Login</Button>
        </div>
      </div>
    </div>
  )
}
