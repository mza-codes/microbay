import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './Contexts/FirebaseContext';
import Post from './Contexts/PostContext';
import View from './Pages/ViewPost'
import Result, { SearchResult } from './Contexts/ResultContext';
import ViewResult from './Pages/SearchResult';

function App() {
  const { user, setUser } = useContext(AuthContext)
  const { FirebaseInit } = useContext(FirebaseContext)
  useEffect(() => {
    FirebaseInit.auth().onAuthStateChanged((user) => {
      setUser(user)
      console.log('USER SET COMPLETE');
    })
  })
  return (
    <div>
      <Post>
        <Result>
          <Router>
            <Route exact path='/' >
              <Home />
            </Route>
            <Route path='/signup' >
              {user ? <Home /> : <Signup />}
            </Route>
            <Route path='/login' >
              {user ? <Home /> : <Login />}
            </Route>
            <Route path='/create' >
              {user ? <Create /> : <Login />}
            </Route>
            <Route path='/view' >
              <View />
            </Route>
            <Route path='/results' >
              <ViewResult />
            </Route>
          </Router>
        </Result>
      </Post >
    </div >
  );
}

export default App;
