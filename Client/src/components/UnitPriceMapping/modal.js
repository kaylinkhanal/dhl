import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalLayout = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button type="primary" onClick={showModal}>Add Price</button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        {props.priceForm()}
      </Modal>
    </>
  );
};

export default ModalLayout