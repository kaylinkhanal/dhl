import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMap, faPhone, faCalendarAlt, faClock, faDolly } from '@fortawesome/free-solid-svg-icons'

const OrdersList = ()=>{
    const [orderList, setOrderList] = useState([])

    const fetchData = async()=>{
        const response = await fetch("http://localhost:5000/orders")
        const data = await response.json()

        if(data){
            setOrderList(data.ordersList)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <section>
            <div className='container'>
                <div className='orderList'>
                    <h1 className='title'><i><FontAwesomeIcon icon={faDolly}/></i> My Orders</h1>
                    {orderList.length > 0 ? orderList.map((item)=>{
                        return(
                            <div className='order_item'>
                                <div className='top'>
                                    <p className='badge'>Status: <span className='pending'>Pending</span></p>
                                    <span>#{item._id}</span> <span><strong>{item.productType}</strong></span>
                                </div>
                                
                                <div className='bottom'>
                                    <ul>
                                        <li><i><FontAwesomeIcon icon={faUser}/></i> {item.receipentName}</li>
                                        <li><i><FontAwesomeIcon icon={faMap}/></i> {item.receipentLocation}</li>
                                        <li><i><FontAwesomeIcon icon={faPhone}/></i> {item.receipentNumber}</li>
                                        <li><i><FontAwesomeIcon icon={faCalendarAlt}/></i> {item.expectedDeliveryDate}</li>
                                        <li><i><FontAwesomeIcon icon={faClock}/></i> {item.expectedDeliveryTime}</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }): 'list not found'}
                </div>
            </div>
        </section>
    )
}

export default OrdersList