import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserContext, { FirebaseContext } from './Contexts/FirebaseContext'
import { FirebaseInit } from './firebase/config'
ReactDOM.render(
    <FirebaseContext.Provider value={{ FirebaseInit }} >
        <UserContext>
            <App />
        </UserContext>
    </FirebaseContext.Provider>,
    document.getElementById('root'));
