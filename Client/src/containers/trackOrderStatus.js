import React, { useEffect, useState } from "react";
import { Steps } from 'antd';
import { FaClipboardCheck } from 'react-icons/fa';
import { BiRun } from "react-icons/bi";
import { GiCardPickup } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";

const TrackOrderStatus = () => {
    
    return (
        <section style={{
            height: 'calc(100vh - 64px)', display: 'flex', flexFlow: 'row', alignItems: 'center', textAlign: 'center'
        }}>
            <div className="container">
                <div className="status-bar">
                    <h1 style={{ marginBottom: '80px' }}>Your Order Satus</h1>
                    
                </div>
            </div>
        </section >

    )
}
export default TrackOrderStatus