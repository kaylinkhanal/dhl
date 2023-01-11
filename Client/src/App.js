import React from "react";
import './App.css';
import ConditionalRouting from "./components/conditionalRoute";
import Header from "./components/Header/header";
const App = ()=> {
  return (
    <>
      <Header/>
      <ConditionalRouting/>
    </>
  )
}

export default App;
