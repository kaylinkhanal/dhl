import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SlTrash, SlPencil, SlCalender, SlLocationPin, SlClock, SlPhone, SlUser, SlClose, } from "react-icons/sl";
import { BiRun } from "react-icons/bi";
import { Modal, Popconfirm, Tooltip } from "antd";
import { TbTruckDelivery } from "react-icons/tb";
import { GiCardPickup } from "react-icons/gi";
import { MdOutlineFactCheck } from "react-icons/md"
import statusMapping from "../../configs/statusMapping.json"
import Orders from "../../containers/User/orders";
import io from 'socket.io-client';
const socket = io("http://localhost:5000");

const Box = ({ item, fetchData, isRider }) => {
	console.log(statusMapping)
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

	const orderTrackDetails = (e, statusId) => {
		const orderStatus = Object.keys(statusMapping).find(item => statusMapping[item] == statusId)
		const orderDetails = {
			status: orderStatus,
			id: item._id
		}
		socket.emit('requestOrder', orderDetails)
		fetchData()
		// e.currentTarget.classList.add('active');
	}

	const isDisabledStatus= (currentId)=> {
	const currentStatus = item.orderStatus
	const statusId = statusMapping[currentStatus]
	if(currentId <= statusId) return true
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
			) : <div className="btns rider">
				<button disabled={isDisabledStatus(2)} className={isDisabledStatus(2) ? "success": null} onClick={(e) => orderTrackDetails(e, 2)}> <Tooltip title="Rider is on his way" placement="topRight"><BiRun /></Tooltip></button>
				<button   disabled={isDisabledStatus(3)} className={isDisabledStatus(3) ?  "success": null} onClick={(e) => orderTrackDetails(e, 3)}><Tooltip title={`Rider has picked up from ${item.senderLocation}`} placement="topRight"><GiCardPickup /></Tooltip></button>
				<button  disabled={isDisabledStatus(4)} className={isDisabledStatus(4) ? "success": null}  onClick={(e) => orderTrackDetails(e, 4)}><Tooltip title="Product has been dispatched for delivery" placement="topRight"><TbTruckDelivery /></Tooltip></button>
				<button disabled={isDisabledStatus(5)} className={isDisabledStatus(5) ? "success": null}  onClick={(e) => orderTrackDetails(e, 5)}><Tooltip title={`Item has been has been delivered to ${item.receipentName}`} placement="topRight"> <MdOutlineFactCheck /></Tooltip></button>
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