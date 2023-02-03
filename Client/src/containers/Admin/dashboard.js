import React, { useState, useEffect } from "react";
import AddProductCategory from "./addProductCategory";
import { Modal, Popconfirm } from 'antd';
import Card from "../../components/ReusableComps/card";
import { FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
import { SlTrash, SlPencil } from "react-icons/sl";



const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState([])

    const fetchCategory = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/category`)
        const data = await response.json();

        if (data) {
            setCategory(data.categoryList);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (!isModalOpen) {
            setIsModalOpen(true)
        } else {
            setIsModalOpen(false);
        }
    };
    <div className="btns">
    <button onClick={showModal}><i><SlPencil /></i></button>

   
</div>
    return (
        <section id="admin_dashboard">
            <div className="container">
                <div className="main_content half_section">
                    <div className="category_section">
                        <h2>Available Categories</h2>

                        <div className="add_category">
                            <button onClick={showModal}>Add Product Type/Category</button>
                            <Modal open={isModalOpen} onOk={handleOk} footer={null} onCancel={handleOk}>
                                <AddProductCategory submitForm={handleOk} fetchCategory={fetchCategory} />
                            </Modal>

                            <div className="category_list">
                                {category.length > 0 ? category.map((item) => {
                                    return (
                                        <Card title={item.categoryName} icon={<FaTelegramPlane />} isCategory={true} Item={item}  fetch={fetchCategory}/>
                                    )
                                }) : 'loading'}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default Dashboard