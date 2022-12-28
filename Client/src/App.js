import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./container/login/login";
import Auth from "./container/registration/auth";
import Home from "./container/home/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Auth/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
