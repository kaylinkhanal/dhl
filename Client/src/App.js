import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import RegisterUser from "./components/RegisterUser";
import Home from "./components/Home";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterUser />} />
    </Routes>
    </>
  );
}

export default App;
