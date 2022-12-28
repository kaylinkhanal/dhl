import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import RegistrationForm from "./containers/registrationForm";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <>
      <>
        <NavBar />
      </>
      <Routes>
        <Route exact path="/registrationform" element={<RegistrationForm />} />
      </Routes>
    </>
  );
};

export default App;
