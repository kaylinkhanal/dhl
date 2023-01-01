import React from "react";
import '../style.css'
import { GrLogout } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import OrderCard from "../../components/order/orderCard";


const Dashboard = ()=>{
    return(
        <div className="main-div">
            <div className="main-nav">
                <GrLogout  className="icon"/>
                <FaUserCircle  className="icon"/>
            </div>
            <div className="cards">
                <div className="send-items">
                    <Link to="/order" element={<OrderCard/>} style={{textDecoration:"none", color:"white"}}>
                        <label>Sent items</label>
                    </Link>
                </div>
                <div className="my-orders">
                    <label>My orders</label>
                </div>
            </div>
            <div className="instruction-div">
                <h1 className="click-option">Click above box to order or see your orders</h1>
            </div>
            
        </div>
    )
}
export default Dashboard