import React, { useEffect, useState } from "react";
import Box from "../../components/box";
import { FaDolly } from "react-icons/fa";
import CardSkeletion from "../../components/cardSkeletion";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_BASE_URL);

const OrdersList = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false)
  const {_id} = useSelector(state => state.user)

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${_id}/orders`)
    const data = await response.json();

		if (data) {
			setOrderList(data.ordersList);
			setLoading(true)
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
		
	useEffect(()=> {
		if(orderList.length> 0){
			socket.on('orderDetails', (orderDetails)=>{
				const bckUpList = [...orderList]
				bckUpList.map(item=>{
				if(item._id== orderDetails.id){
					item.orderStatus = orderDetails.status
					return item
				}
				})
				setOrderList(bckUpList)
			})
		}
	},[socket, orderList])


	return (
		<section>
			<div className="container">
				<div className="orderList">
					<h1 className="title"><i><FaDolly /></i> My Orders</h1>

					{orderList.length > 0 ? orderList.map((item, id) => {
						return <Box key={id} item={item} fetchData={fetchData} />
					}) : !loading ? <CardSkeletion boxNumber={4}/> : <h3>Orders not Found</h3>}
				</div>
			</div>
		</section>
	);
};

export default OrdersList;
