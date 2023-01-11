import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "./box";
import { faDolly } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "antd";
import { Pagination } from 'antd';
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
          <h1 className="title">
            <i>
              <FontAwesomeIcon icon={faDolly} />
            </i>{" "}
            My Orders
          </h1>
          {orderList.length > 0 ? (
            <>
           { 
           orderList.map((item) => {
              return <Box item={item} fetchData={fetchData} />;
            })
            }
            <Pagination defaultCurrent={6} total={500} />
            </>
          ) : (
            
            <Skeleton active paragraph={{ rows: 3 }} />
            // <Skeleton />
          )}
        </div>
   
      </div>
    </section>
  );
};

export default OrdersList;
