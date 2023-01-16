import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux"
import { SlTrash, SlPencil, SlCalender, SlLocationPin, SlClock, SlPhone, SlUser } from "react-icons/sl";
import { Modal, message, Popconfirm } from 'antd';
import Orders from '../containers/User/orders';

const Box = ({ item, fetchData }) => {
    const { userRole } = useSelector(state => state.user)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const triggerDelete = (item) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/orders`, { data: { id: item._id } })
            .then(response => response ? fetchData() : null)
            .catch(error => {
                console.error('There was an error!', error);
            });
        message.success(`your order for ${item.productType} has been deleted`);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const cancel = () => {
        message.error(`Cancelled Delete`);
    };

    return (
        <>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Orders isEdit={true} item={item} onOk={handleOk} />
            </Modal>

            <div className='btns'>
                <button onClick={showModal}><i><SlPencil /></i></button>

                <Popconfirm
                    title="Delete the order"
                    description="Are you sure to delete this order?"
                    onConfirm={() => triggerDelete(item)}
                    onCancel={() => cancel(item)}
                    okText="Yes"
                    cancelText="No"
                >
                    <button ><i><SlTrash /></i></button>
                </Popconfirm>
            </div>

            <div className='order_item'>
                <div className='top'>
                    <p className='badge'>Status: <span className='pending'>{item.orderStatus}</span></p>
                    <span>Sender: {item.senderName}</span>
                    <span className='orderId'>#{item._id}</span>
                    <span>{item.productType}</span>
                </div>

                {userRole === "admin" ?
                    <>
                        <button>Accept</button>
                        <button>Reject</button>
                    </>  
                : null}

                <div className='bottom'>
                    <ul>
                        <li><i><SlUser /></i> Receipant Name:<br/>{item.receipentName}</li>
                        <li><i><SlLocationPin /></i> Receipant Location:<br/>{item.receipentLocation}</li>
                        <li><i><SlPhone /></i> Receipant Contact:<br/>{item.receipentNumber}</li>
                        <li><i><SlCalender /></i> Delivery Date:<br/>{item.expectedDeliveryDate}</li>
                        <li><i><SlClock /></i> Delivery time:<br/>{item.expectedDeliveryTime}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Box