import React from "react";
import './App.css';
import Register from "./containers/registration/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/registration/login";


const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App;
