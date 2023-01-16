import React, {useState, useEffect} from "react";
import OrdersData from "../../components/ordersDataTable";
import { Pagination } from 'antd';
import { FaDolly } from "react-icons/fa";

const AdminOrdersList = ()=>{
    const [orderList, setOrderList] = useState([]);
	const [totalOrderCount, setTotalOrderCount] = useState(0);
    console.log(orderList)
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

    return(
        <section id="orders">
            <div className="container">
                <div className="orders-data">
                    <h1 className="title"><i><FaDolly /></i> Orders List</h1>
                    <OrdersData orderList={orderList}/>
                    <Pagination defaultPageSize={5} onChange={(page, size) => fetchData(page, size)} total={totalOrderCount} showSizeChanger/>
                </div>
            </div>
        </section>
    )
}
export default AdminOrdersList