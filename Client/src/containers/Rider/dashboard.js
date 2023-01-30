import React, { useEffect, useState } from "react";
import Box from "../../components/box";
import { FaDolly } from "react-icons/fa";
import CardSkeletion from "../../components/cardSkeletion";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
// import io from 'socket.io-client';
// const socket = io(process.env.REACT_APP_BASE_URL);

const OrdersList = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/filterOrders?orderStatus=accepted`)
    const data = await response.json();
    
		if (data) {
			setOrderList(data.orderList);
			setLoading(true)
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

    const trailingActions  = (id) => (
        <TrailingActions>
          <SwipeAction onClick={() => console.info('swipe action triggered', id)} >
            Pick 
          </SwipeAction>
        </TrailingActions>
      );
		
	// useEffect(()=> {
	// 	if(orderList.length>0){
	// 		socket.on('orderDetails',(orderDetails)=>{
	// 			const bckUpList = [...orderList]
	// 			if(bckUpList.length>0 ){
	// 				bckUpList.map(item=>{
	// 					if(item._id== orderDetails.id){
	// 					  item.orderStatus = orderDetails.status
	// 					  return item
	// 					}
	// 				  })
	// 				  setOrderList(bckUpList)
	// 			}
	// 		})
	// 	}
	// },[socket,orderList])


	return (
		<section>
			<div className="container">
				<div className="orderList">
					<h1 className="title"><i><FaDolly /></i> My Orders</h1>

                    <SwipeableList>
                           {orderList.length > 0 ? orderList.map((item, id) => {
                                return (
                                    
                                        <SwipeableListItem trailingActions={trailingActions(id)}>
                                            <Box key={id} item={item} fetchData={fetchData} isRider={true}/>
                                        </SwipeableListItem>
                                    
                                )
                            }) : !loading ? <CardSkeletion boxNumber={4}/> : <h3>Orders not Found</h3>}
                       
                       </SwipeableList>
					{/* {orderList.length > 0 ? orderList.map((item, id) => {
						return <Box key={id} item={item} fetchData={fetchData} isRider={true}/>
					}) : !loading ? <CardSkeletion boxNumber={4}/> : <h3>Orders not Found</h3>} */}
				</div>
			</div>
		</section>
	);
};

export default OrdersList;
