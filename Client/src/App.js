import React from "react";
import './App.css';

const App =()=> {
  return (
    <>
    <Routes>
      <Route exact path="/" 
      element={<TicketWinner/>} />
      
      <Route exact path="/registeruser" 
      element={<RegisterUser/>} />
      
      <Route exact path="/assignwinner" 
      element={<AssignWinner/>} />
   
    </Routes>
    </>
  );
}

export default App;
