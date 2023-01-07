import React from "react";
import { useSelector } from "react-redux";

const Dashboard = ()=>{
    const {name} = useSelector(state=> state.user)
    return(
        <section id="admin_dashboard">
            <div className="container">
                <div className="main_content">
                    <h1>Welcome, {name}</h1>
                </div>
            </div>
        </section>
    )
}
export default Dashboard;