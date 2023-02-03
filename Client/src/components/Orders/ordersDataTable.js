import React, { useEffect } from "react"
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_BASE_URL);

//to send data to sockets, we just emit the data
const OrdersData = ({ orderList, fetchData }) => {
    useEffect(() => {
        socket.on('connect');
    }, []);

    const changeStatus = async (status, id, val) => {
        const orderDetails = {
            status,
            id,
            val
        }
        socket.emit('requestOrder', orderDetails)
        fetchData()
    }
    return (
        <div style={{ 'overflowX': 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Type</th>
                        <th>Weight</th>
                        <th>Size</th>
                        <th>Sender Location</th>
                        <th>Receipent Location</th>
                        <th>Sender Name</th>
                        <th>Receipent Name</th>
                        <th>Receipent Number</th>
                        <th>Delivery Date</th>
                        <th>Status</th>
                        <th>Accept/Reject</th>
                    </tr>
                </thead>

                <tbody>
                    {orderList.length > 0 ? orderList.map((item, id) => {
                        return (
                            <tr style={item.orderStatus === "accepted"
                                ? { background: '#b6f2c7' }
                                : item.orderStatus === "rejected"
                                    ? { background: "#f2b6b6" } : null}
                                key={id}>
                                <td>{id + 1}.</td>
                                <td>{item.productType}</td>
                                <td>{item.productWeight}kg</td>
                                <td>{item.maxSize}m</td>
                                <td>{item.senderLocation}</td>
                                <td>{item.receipentLocation}</td>
                                <td>{item.senderName}</td>
                                <td>{item.receipentName}</td>
                                <td>{item.receipentNumber}</td>
                                <td>{item.expectedDeliveryDate}</td>
                                <td>{item.orderStatus}</td>
                                <td>
                                    <button className="success" onClick={() => changeStatus('accepted', item._id, 1)}>Accept</button>
                                    <button className="cancel" onClick={() => changeStatus('rejected', item._id)}>Reject</button>
                                </td>
                            </tr>
                        )
                    }) : 'data not found'}
                </tbody>
            </table>
        </div>
    )
}
export default OrdersData