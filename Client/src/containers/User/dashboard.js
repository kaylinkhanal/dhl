import React from "react";
import '../style.css'
import { GrLogout } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Orders from "./orders";
import OrdersList from "./ordersList";



const Dashboard = ()=>{
    return(
        <div className="main-div">
            <div className="main-nav">
                <GrLogout  className="icon"/>
                <FaUserCircle  className="icon"/>
            </div>
            <div className="cards">
                <div className="send-items">
                    <Link to="/orders" element={<Orders/>} style={{textDecoration:"none", color:"white"}}>
                        <label>Sent items</label>
                    </Link>
                </div>
                <div className="my-orders">
                    <Link to="/ordersList" element={<OrdersList/>} style={{textDecoration:"none", color:"white"}}>
                        <label>My orders</label>
                    </Link>
                   
                </div>
            </div>
            <div className="instruction-div">
                <h1 className="click-option">Click above box to order or see your orders</h1>
            </div>
            
        </div>
    )
}
export default Dashboard