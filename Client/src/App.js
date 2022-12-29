import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Auth/register"
import Login from "./pages/Auth/login";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
