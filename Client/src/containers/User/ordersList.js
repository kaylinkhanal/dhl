import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "../../components/box";
import { faDolly } from "@fortawesome/free-solid-svg-icons";
// import { Skeleton } from "antd";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// import { Pagination } from 'antd';

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
            
          {orderList.map((item) => {
            return <Box item={item} fetchData={fetchData} />;
            
          })
          }

          </>
            
          ) : (
            <Stack spacing={2}>
  
            <Skeleton variant="rectangular" width={500} height={150} />
            <Skeleton variant="rectangular" width={500} height={150} />
            <Skeleton variant="rectangular" width={500} height={150} />
            <Skeleton variant="rectangular" width={500} height={150} />
            
            
            </Stack>
            // <Skeleton block="true" />
            
          )
          
          }

          
        </div>

      </div>
    </section>
  );
};

export default OrdersList;
