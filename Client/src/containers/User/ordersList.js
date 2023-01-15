import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "../../components/box";
import { faDolly } from "@fortawesome/free-solid-svg-icons";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Pagination } from 'antd';

// import { Pagination } from 'antd';

const OrdersList = () => {
  const [orderList, setOrderList] = useState([]);
  const [totalOrderCount, settotalOrderCount] = useState(0);

  const fetchData = async (page,size) => {
    const response = await fetch(`http://localhost:5000/orders?page=${page || 1}&size=${size || 5}`);
    const data = await response.json();

    if (data) {
      setOrderList(data.ordersList);
      settotalOrderCount(data.totalOrderCount);
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
          <Pagination  onChange={(page,size)=>fetchData(page,size)} total={totalOrderCount} onShowSizeChange  showQuickJumper  /> {/**Pagination added form antdesign **/}

          </>
            
          ) : (
          <Stack spacing={2}>   {/*Skeleton added  from mui*/}

  
            <Skeleton variant="rectangular" width={500} height={150} />
            <Skeleton variant="rectangular" width={500} height={150} />
            <Skeleton variant="rectangular" width={500} height={150} />
            <Skeleton variant="rectangular" width={500} height={150} />
            
            
            </Stack>
           
            
          )
          
          }

          
        </div>

      </div>
    </section>
  );
};

export default OrdersList;
