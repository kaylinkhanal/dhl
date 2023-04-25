import React, { useEffect, useState } from "react";
import { FaDolly } from "react-icons/fa";
import Box from "./box";
import { Skeleton } from "antd";
import { Pagination } from 'antd';
const OrdersList = () => {
	const [orderList, setOrderList] = useState([]);
	const [totalOrderCount, setTotalOrderCount] = useState(0);

	const fetchData = async (page, size) => {
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders?page=${page || 1}&size=${size || 5}`);
		const data = await response.json();
		if (data) {
			setOrderList(data.ordersList);
			setTotalOrderCount(data.totalOrderCount)
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
					{orderList.length > 0 ? 
						<>
							{
								orderList.map((item) => {
									return <Box item={item} fetchData={fetchData} />;
								})
							}
							<Pagination
								defaultPageSize={5}
								onChange={(page, size) => fetchData(page, size)} total={totalOrderCount} />
						</>:orderList.length > 0 ? orderList.map((item, id) => {
	                           return <Box key={id} item={item} fetchData={fetchData} />
                                        }) : !loading ? <Skeleton active paragraph={{ rows: 3 }}/> : <h3>There is no Order List</h3>}
				</div>
			</div>
		</section>
	);
};

export default OrdersList;


