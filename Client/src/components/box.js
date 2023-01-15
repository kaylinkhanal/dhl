import React,{useState} from 'react'
import axios from  'axios'
import {useSelector} from "react-redux"
import { SlTrash, SlPencil, SlCalender, SlLocationPin, SlClock, SlPhone, SlUser } from "react-icons/sl";
import { Modal } from 'antd';
import Orders from '../containers/User/orders';

const Box = ({ item, fetchData }) => {
    const {userRole} = useSelector(state=> state.user)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const triggerDelete=  () => {
         axios.delete(`${process.env.REACT_APP_BASE_URL}/orders`, { data: { id: item._id } })
        .then(response => response ? fetchData(): null)
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const showModal = () => {
        setIsModalOpen(true);
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
                <Orders isEdit={true} item={item} onOk={handleOk}/>
            </Modal>
            <div className='btns'>
                <button onClick={showModal}><i><SlPencil/></i></button>
                <button onClick={()=> triggerDelete()}><i><SlTrash /></i></button>
            </div>

            <div className='order_item'>
                <div className='top'>
                    <p className='badge'>Status: <span className='pending'>{item.orderStatus}</span></p>
                    <span>Sender: {item.senderName}</span>
                    <span className='orderId'>#{item._id}</span> 
                    <span>{item.productType}</span>
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
                        null
                    )}
                        

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