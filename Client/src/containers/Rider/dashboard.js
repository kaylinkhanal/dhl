import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const Dashboard = ()=>{
    return(
        <>
        <h1>Rider Dashboard</h1>

        <Button><Link to="/" >Logout</Link></Button>
        </>
    )
}
export default Dashboard;