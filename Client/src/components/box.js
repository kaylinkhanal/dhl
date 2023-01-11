import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMap, faPhone, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import axios from  'axios'
import { Button, Modal } from 'antd';
import Orders from '../containers/User/orders'
const Box = ({ item, fetchData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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

                    <button onClick={()=> triggerDelete()}>
                        Delete
                    </button>

                    <Button onClick={()=>showModal()}>
                        Edit
                    </Button>
                    <Modal  open={isModalOpen} footer={null} onCancel={handleCancel}>
                        <Orders isEdit={true} item={item}/>
                    </Modal>

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