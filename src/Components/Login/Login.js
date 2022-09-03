// import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

import Logo from '../../olx-logo.png';
import './Login.css';
function Login() {
  // const {setUser} = useContext(AuthContext)
  const { FirebaseInit } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false);
  const route = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pwdLength, setPwdLength] = useState(false)
  // const {FirebaseInit} = useContext(FirebaseContext)
  const handleLogin = (e) => {
    e.preventDefault()
    if (password.length >= 5) {
      setPwdLength(false)
      FirebaseInit.auth().signInWithEmailAndPassword(email, password).then((result) => {
        // setUser(result.user)
        route.push('/')
      }).catch((err) => { setLoading(false); alert(err.message) })
    } else {
      setPwdLength(true)
      setLoading(false)
    }
  }
  return (
    <div>
      <div className="container">
        <h1 className='text-center p-3 m-3 times '>Login</h1>
        <hr />
        <div className='row mt-3 login'>
          <img width="300px" height="300px" src={Logo}></img>
          <TextField required onChange={(e) => { setEmail(e.target.value); setLoading(false) }}
            type="email" value={email}
            label="Email" color="secondary" variant="filled" focused />
          <TextField required onChange={(e) => { setPassword(e.target.value); setLoading(false) }}
            type="password" value={password}
            label="Password" variant="filled" color="warning" focused />
          {pwdLength && <p id='pwdLength' className='times' style={{ color: 'red', fontSize: '15px' }} >
            *Password must be more than 5 Characters Long </p>}
          <div>
            {/* <Box sx={{ '& > button': { m: 1 } }}> */}
            <LoadingButton
              color="secondary"
              onClick={(e) => { setLoading(true); handleLogin(e) }}
              loading={loading}
              loadingPosition="end"
              endIcon={<SendIcon />}
              variant="contained">
              Login
            </LoadingButton>
            <br />
            
            {/* </Box> */}
          </div>
          <Button onClick={()=>route.push('/signup')} color='warning' variant="contained" component="label">Sign Up</Button>
        </div>
      </div>
    </div>
  )
}

export default Login;
