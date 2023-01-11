import React, { useEffect, useState } from "react";
import Box from "../../components/box";
import { FaDolly } from "react-icons/fa";
import CardSkeletion from "../../components/cardSkeletion";

const OrdersList = () => {
	const [orderList, setOrderList] = useState([]);

	const fetchData = async () => {
		const response = await fetch("http://localhost:5000/orders");
		const data = await response.json();

		if (data) {
			setOrderList(data.ordersList);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section>
			<div className="container">
				<div className="orderList">
					<h1 className="title"><i><FaDolly /></i>My Orders</h1>

					{orderList.length > 0 ? orderList.map((item, id) => {
						return <Box key={id} item={item} fetchData={fetchData} />
					}) : <CardSkeletion boxNumber={4} />}
				</div>
			</div>
		</section>
	);
};

export default OrdersList;
