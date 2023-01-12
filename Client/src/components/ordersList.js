import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "./box";
import { faDolly } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "antd";
import { Pagination } from 'antd';
const OrdersList = () => {
  const [orderList, setOrderList] = useState([]);
  const [totalOrderCount, setTotalOrderCount] = useState(0);

  
  const fetchData = async (page, size) => {
    const response = await fetch(`http://localhost:5000/orders?page=${page || 1}&size=${size || 5}`);
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
            <Pagination
            defaultPageSize={5}
            onChange={(page,size)=>fetchData(page, size)} total={totalOrderCount} />
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
