import React, { useEffect, useState } from "react";
// import {  Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import OrderCard from "../../components/orderCard";
// import setOrderrDetails from "../../reducers/orderSlice"
import "../style.css"

const OrdersList = () => {
  const [ordersList, setOrdersList] = useState([]);
  
  const fetchOrder = async () => {
    const res = await fetch("http://localhost:5000/orders");
    const data = await res.json();
    setOrdersList(data.ordersList);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <>
      <h1>This are your Order list:</h1>
      {ordersList.length > 0
        ? ordersList.map((item) => (
            <div className="orderCard">
              <p>Product Type : {item.productType}</p>
              <p>Sender name : {item.senderName}</p>
              <p>Reciver name : {item.receipentName}</p>
              <p>
                from :{item.senderLocation} to: {item.receipentLocation}
              </p>
              <hr />
            </div>
          ))
        : null}
    </>
  );
};
export default OrdersList;
