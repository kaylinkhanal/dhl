import React from 'react'
import axios from  'axios'
import { SlTrash, SlPencil, SlCalender, SlLocationPin, SlClock, SlPhone, SlUser } from "react-icons/sl";

const Box = ({ item, fetchData }) => {
    const triggerDelete=  () => {
         axios.delete('http://localhost:5000/orders', { data: { id: item._id } })
        .then(response => response ? fetchData(): null)
        .catch(error => {
            console.error('There was an error!', error);
        });
        
    }
    return (
        <>
            <div className='btns'>
                <button onClick={()=> null}><i><SlPencil/></i></button>
                <button onClick={()=> triggerDelete()}><i><SlTrash /></i></button>
            </div>
            <div className='order_item'>
                <div className='top'>
                    <p className='badge'>Status: <span className='pending'>{item.orderStatus}</span></p>
                    <span className='orderId'>#{item._id}</span> 
                    <span>{item.productType}</span>
                </div>
                <div className='bottom'>
                    <ul>
                        <li><i><SlUser/></i> {item.receipentName}</li>
                        <li><i><SlLocationPin/></i> {item.receipentLocation}</li>
                        <li><i><SlPhone/></i> {item.receipentNumber}</li>
                        <li><i><SlCalender/></i> {item.expectedDeliveryDate}</li>
                        <li><i><SlClock/></i> {item.expectedDeliveryTime}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Box