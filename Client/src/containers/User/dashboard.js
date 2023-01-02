import { faCartShopping, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Card from "../../components/card";
import { useSelector } from 'react-redux';

const Dashboard = ()=>{
    const {name} = useSelector(state=> state.user)
    return(
        <>
            <h5>Welcome, {name}</h5>

            <div className="bg-image"></div>
            <div className="card_block">
                <Card title='Send Item' link="/orders"/>
                <Card title='My Orders' link="/ordersList"/>
            </div>
        </>
    )
}
export default Dashboard