import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMap, faPhone, faCalendarAlt, faClock, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'antd';
import axios from  'axios'
import Orders from '../containers/User/orders';

const Box = ({ item, fetchData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const triggerDelete=  () => {
         axios.delete('http://localhost:5000/orders', { data: { id: item._id } })
        .then(response => response ? fetchData(): null)
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const showModal = (item) => {
        setIsModalOpen(true);
        setSelectedItem(item)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Orders isEdit={true} selectedItem={selectedItem}/>
            </Modal>
            <div className='btns'>
                <button className='edit' onClick={()=>showModal(item)}>
                    <i><FontAwesomeIcon icon={faPencil} /></i>
                </button>
                <button className='cancel' onClick={()=> triggerDelete()}>
                    <i><FontAwesomeIcon icon={faTrash} /></i>
                </button>
            </div>

            <div className='order_item'>
                <div className='top'>
                    <p className='badge'>Status: <span className='pending'>{item.orderStatus}</span></p>
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
export default Box