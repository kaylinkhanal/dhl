import React from 'react';
import { DatePicker, Space } from 'antd';

const onChange = (date, dateString) => {
  // console.log(date, dateString);
};
const ChooseDate = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} placeholder="Enter Delivery Date" />
    
  </Space>
);
export default ChooseDate;