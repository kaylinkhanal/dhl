import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMap, faPhone, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import axios from  'axios'
import {useSelector} from "react-redux"
const Box = ({ item, fetchData }) => {
    const {userRole} = useSelector(state=> state.user)
    const triggerDelete=  () => {
         axios.delete('http://localhost:5000/orders', { data: { id: item._id } })
        .then(response => response ? fetchData(): null)
        .catch(error => {
            console.error('There was an error!', error);
        });
        
    }
    return (
        <>
            <div className='order_item'>
                <div className='top'>
                    <p className='badge'>Status: <span className='pending'>{item.orderStatus}</span></p>
                    <span>#{item._id}</span> <span><strong>{item.productType}</strong></span>
                </div>
                        {userRole =="admin" ? (
                            <>
                              <button>
                                Accept
                            </button>
                            <button>
                                Reject
                            </button>
                            </>
                        ): (
                        <button onClick={()=> triggerDelete()}>
                        Delete
                    </button>
                    )}
                        

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