import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  return (
    <div>
      <Router>
      <Home />
      </Router>
    </div>
  );
}

export default App;
