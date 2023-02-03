import { FaDolly, FaTelegramPlane } from "react-icons/fa";
import React from "react";
import Card from "../../components/ReusableComps/card";
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { name } = useSelector(state => state.user)
    return (
        <>
            <h4>Welcome, {name}</h4>

            <div className="bg-image"></div>
            <div className="card_block">
                <Card title='Send Item' link="/orders" icon={<FaTelegramPlane />} />
                <Card title='My Orders' link="/userOrdersList" icon={<FaDolly />} />
            </div>
        </>
    )
}
export default Dashboard