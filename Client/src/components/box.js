import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SlTrash, SlPencil, SlCalender, SlLocationPin, SlClock, SlPhone, SlUser, SlClose, } from "react-icons/sl";
import { BiRun } from "react-icons/bi";
import { GiCardPickup } from "react-icons/gi";
import { TbFile, TbTruckDelivery } from "react-icons/tb";
import { Modal, Popconfirm } from "antd";
import StatusMapping from "../configs/statusMapping.json"
import Orders from "../containers/User/orders";
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

	const orderTrackDetail = (statusId) => {
		const orderStatus = Object.keys(StatusMapping).find(item => StatusMapping[item] === statusId)
		console.log(orderStatus)

		const orderDetails = {
			status: orderStatus,
			id: item._id
		}
		socket.emit('requestOrder', orderDetails)
		fetchData()
	}

	return (
		<>

			<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
				<Orders isEdit={true} item={item} onOk={handleOk} />
			</Modal>
			{!isRider ?
				<div className="btns">
					<button onClick={showModal}><i><SlPencil /></i></button>

					<Popconfirm
						title="Delete order"
						description="Are you sure you want to delete this order?"
						onConfirm={() => triggerDelete()}
					>
						<button><i><SlTrash /></i></button>
					</Popconfirm>
				</div> :
				<div className="btns rider">
					<button onClick={() => orderTrackDetail(2)}><i><BiRun /></i></button>
					<button onClick={() => orderTrackDetail(3)}><i><GiCardPickup /></i></button>
					<button onClick={() => orderTrackDetail(4)}><i><TbTruckDelivery /></i></button>
					<button onClick={() => orderTrackDetail(5)}><i><TbFile /></i></button>
				</div>
			}

			<div className="order_item" >
				<div className={"top " + (item.orderStatus === 'rejected' ? 'error' : item.orderStatus === 'aproved' ? 'success' : '')}>
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
								!item.orderImg ? <img src={require('../images/dhl.png')} height={40} alt="orders" /> :
									<img src={require('../uploads/orders/' + item.orderImg)} height={40} alt="orders" />
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
