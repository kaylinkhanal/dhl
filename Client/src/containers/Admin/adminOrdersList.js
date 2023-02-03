import React, { useState, useEffect } from "react";
import OrdersData from "../../components/Orders/ordersDataTable";
import { Pagination } from 'antd';
import { FaDolly } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
const onSearch = (value) => console.log(value);
const AdminOrdersList = () => {
    const [orderList, setOrderList] = useState([]);
    const [totalOrderCount, setTotalOrderCount] = useState(0);
    const { token } = useSelector(state => state.user)

    const fetchData = async (page, size) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders?page=${page || 1}&size=${size || 5}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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
        <section id="orders">
            <div className="container">
                <div className="orders-data">
                    <h1 className="title"><i><FaDolly /></i> Orders List</h1>
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    <OrdersData orderList={orderList} fetchData={fetchData} />
                    <Pagination defaultPageSize={5} onChange={(page, size) => fetchData(page, size)} total={totalOrderCount} showSizeChanger />
                </div>
            </div>
        </section>
    )
}
export default AdminOrdersList