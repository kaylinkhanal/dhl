import React from "react";
import './App.css';
import Register from "./containers/registration/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
