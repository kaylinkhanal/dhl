import React from "react";
import './App.css';
import Register from "./containers/Auth/register";
import Login from "./containers/Auth/login";
import {
	BrowserRouter as Router,
	Routes,
	Route,
 } from "react-router-dom";

const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App;
