import React from "react";
import { Link } from "react-router-dom";

import Order from "../../components/orders"
const Dashboard = ()=>{
    return(
        <>
        <Link to={Order}>
        <button onClick={Order} element={<Order/>}>Send an Item</button><br/>
        </Link>
        <button>My Orders</button>
        </>
    )
}
export default Dashboard