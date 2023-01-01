import { faCartShopping, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ()=>{
    return(
        <>
        <div className="bg-image"></div>
        <div className="card_block">
            <div className="card">
                <Link to="/user-order">
                    <i><FontAwesomeIcon icon={faFileExport}/></i>
                    <p>Send item</p>
                </Link>
            </div>

            <div className="card">
                <Link to="/user-order">
                    <i><FontAwesomeIcon icon={faCartShopping}/></i>
                    <p>My Orders</p>
                </Link>
            </div>
        </div>
        </>
    )
}
export default Dashboard