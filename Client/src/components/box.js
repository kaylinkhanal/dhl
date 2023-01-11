import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMap, faPhone, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'

const Box = ({ item }) => {
    const triggerDelete = async(values) => {
        const requestOptions = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        const response = await fetch('http://localhost:5000/orders', requestOptions);
        const data = await response.json()
        console.log(data)
    }
    return (
        <>
            <div className='order_item'>
                <div className='top'>
                    <p className='badge'>Status: <span className='pending'>pending</span></p>
                    <span>#{item._id}</span> <span><strong>{item.productType}</strong></span>
                </div>
                    <button onClick={()=>triggerDelete()}>Delete</button>

                <div className='bottom'>
                    <ul>
                        <li><i><FontAwesomeIcon icon={faUser} /></i> {item.receipentName}</li>
                        <li><i><FontAwesomeIcon icon={faMap} /></i> {item.receipentLocation}</li>
                        <li><i><FontAwesomeIcon icon={faPhone} /></i> {item.receipentNumber}</li>
                        <li><i><FontAwesomeIcon icon={faCalendarAlt} /></i> {item.expectedDeliveryDate}</li>
                        <li><i><FontAwesomeIcon icon={faClock} /></i> {item.expectedDeliveryTime}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Box