import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "../../components/box";
import { faDolly } from "@fortawesome/free-solid-svg-icons";
// import {useSelector} from "react-redux"
import { Skeleton } from "antd";

const OrdersList = () => {
  const [orderList, setOrderList] = useState([]);
  // const {_id} = useSelector(state=> state.user)
  const fetchData = async () => {
    debugger;
    const response = await fetch("http://localhost:5000/orders/");
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
            orderList.map((item) => {
              return <Box item={item} fetchData={fetchData} />;
            })
          ) : (
            <div>
              <Skeleton active paragraph={{ rows: 3 }} />
              <br />
              <Skeleton active paragraph={{ rows: 3 }} />
              <br />
              <Skeleton active paragraph={{ rows: 3 }} />
              <br />
              <Skeleton active paragraph={{ rows: 3 }} />
              <br />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrdersList;
