import React, {useState, useEffect} from "react";
import OrdersData from "../../components/ordersDataTable";
import { Pagination } from 'antd';
import { FaDolly } from "react-icons/fa";
import { useSelector } from "react-redux";
import Search from "../../components/search";

const AdminOrdersList = ()=>{
    const [orderList, setOrderList] = useState([]);
	const [totalOrderCount, setTotalOrderCount] = useState(0);
    const {token} = useSelector(state=> state.user)
    
	const fetchData = async (page, size, key) => {
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders?page=${page || 1}&size=${size || 5}&search=${key}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
		const data = await response.json();

        console.log(data)
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
                    <h1 className="title" style={{display: 'inline-block'}}><i><FaDolly /></i> Orders List</h1>
                    <Search fetchData={fetchData}/>
                    <OrdersData orderList={orderList}/>
                    <Pagination defaultPageSize={5} onChange={(page, size) => fetchData(page, size)} total={totalOrderCount} showSizeChanger/>
                </div>
            </div>
        </section>
    )
}
export default AdminOrdersList