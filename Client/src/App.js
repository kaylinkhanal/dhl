import React from "react";
import './App.css';
import { useEffect,useState } from "react";
import Register from './containers/admin/register'
import { BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
const App =()=> {
  return (
    <>
    <Router>
      <Routes>
      <Route exact path="/register" element={<Register/>} />
      </Routes>
    </Router>
    
    </>
   
  );
}

export default App;
