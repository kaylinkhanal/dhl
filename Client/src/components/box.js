import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMap, faPhone, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'

const Box = ({ item }) => {

    return (
        <>
            <div className='order_item'>
                <div className='top'>
                    <p className='badge'>Status: <span className='pending'>Pending</span></p>
                    <span>#{item._id}</span> <span><strong>{item.productType}</strong></span>
                </div>

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
export default Box;