import { faDolly, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Card from "../../components/card";
import { useSelector } from 'react-redux';
import UserNav from "../../components/userNav";


const Dashboard = () => {
    const { name } = useSelector(state => state.user)
    return (
        <>
            <UserNav />
            <h2>Welcome, {name}</h2>
            <div className="bg-image"></div>
            <div className="card_block">
                <Card title='Send Item' link="/orders" icon={faPaperPlane} />
                <Card title='My Orders' link="/ordersList" icon={faDolly} />
            </div>
        </>
    )
}
export default Dashboard