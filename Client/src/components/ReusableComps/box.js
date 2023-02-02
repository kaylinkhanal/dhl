import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SlTrash, SlPencil, SlCalender, SlLocationPin, SlClock, SlPhone, SlUser, SlClose, } from "react-icons/sl";
import { Modal, Popconfirm } from "antd";
import { FcShipped } from "react-icons/fc";
import { GiCardPickup } from "react-icons/gi";
import statusMapping from "../../configs/statusMapping.json"
import Orders from "../../containers/User/orders";
import io from 'socket.io-client';
const socket = io("http://localhost:5000");

const Box = ({ item, fetchData, isRider }) => {
	const { userRole } = useSelector((state) => state.user);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const triggerDelete = () => {
		axios
			.delete(`${process.env.REACT_APP_BASE_URL}/orders`, {
				data: { id: item._id },
			})
			.then((response) => (response ? fetchData() : null))
			.catch((error) => {
				console.error("There was an error!", error);
			});
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

	const orderTrackDetails = (statusId) => {
		const orderStatus = Object.keys(statusMapping).find(item => statusMapping[item] == statusId)
		const orderDetails = {
			status: orderStatus,
			id: item._id
		}
		socket.emit('requestOrder', orderDetails)
	}

	return (
		<>

			<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
				<Orders isEdit={true} item={item} onOk={handleOk} />
			</Modal>
			{!isRider ? (
				<div className="btns">
					<button onClick={showModal}><i><SlPencil /></i></button>

					<Popconfirm
						title="Delete order"
						description="Are you sure you want to delete this order?"
						onConfirm={() => triggerDelete()}
					>
						<button><i><SlTrash /></i></button>
					</Popconfirm>
				</div>

			) : <div className="btns">
				<i><button onClick={() => orderTrackDetails(2)}>rider is on his way</button>
					<button onClick={() => orderTrackDetails(3)}>rider has picked up from {item.senderLocation}</button>
					<button onClick={() => orderTrackDetails(4)}>Product has been dispatched for delivery</button>
					<button onClick={() => orderTrackDetails(5)}>Item has been has been dispatched</button>
					<GiCardPickup /><FcShipped /></i>
			</div>}

			<div className="order_item" >
				<div className={"top " + (item.orderStatus === 'rejected' ? 'error' : item.orderStatus === 'accepted' ? 'success' : '')}>
					<p className="badge">Status: <span >{item.orderStatus}</span></p>
					<span>Sender: {item.senderName}</span>
					<span className="orderId">#{item._id}</span>
					<span>{item.productType}</span>
				</div>
				{userRole == "admin" ? (
					<>
						<button>Accept</button>
						<button>Reject</button>
					</>
				) : null}

				<div className="bottom">
					<ul>
						<li>
							{
								!item.orderImg ? <img src={require('../../images/dhl.png')} height={40} alt="orders" /> :
									<img src={require('../../uploads/orders/' + item.orderImg)} height={40} alt="orders" />
							}
						</li>
						<li><i><SlUser /></i> Receipant Name:<br />{item.receipentName}</li>
						<li><i><SlLocationPin /></i> Receipant Location:<br />{item.receipentLocation}</li>
						<li><i><SlPhone /></i> Receipant Contact:<br />{item.receipentNumber}</li>
						<li><i><SlCalender /></i> Delivery Date:<br />{item.expectedDeliveryDate}</li>
						<li><i><SlClock /></i> Delivery time:<br />{item.expectedDeliveryTime} </li>
					</ul>
				</div>
			</div>
		</>
	);
};
export default Box;
