import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Register from "./containers/register";
import Login from "./containers/login";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <>
      <>
        <NavBar />
      </>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
