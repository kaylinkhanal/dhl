import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import AddProductCategory from "./addProductCategory";
import { Modal } from 'antd';
import Card from "../../components/card";
import { FaDolly, FaTelegramPlane } from "react-icons/fa";

const Dashboard = ()=>{
    const {name} = useSelector(state=> state.user)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState([])
    
    const fetchCategory = async()=>{
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
        if(!isModalOpen){
            setIsModalOpen(true)
        }else{
            setIsModalOpen(false);
        }
    };
    return(
        <section id="admin_dashboard">
            <div className="container">
                <div className="main_content">
                    <h1>Welcome, {name}</h1>

                    <div className="add_category">
                        <button onClick={showModal}>Add Product Type/Category</button>
                        <Modal open={isModalOpen} onOk={handleOk} footer={null} onCancel={handleOk}>
                            <AddProductCategory submitForm={handleOk}/>
                        </Modal>

                        <div className="category_list">
                            {category.length > 0 ? category.map((item)=>{
                                return(
                                    <Card title={item.categoryName} icon={<FaTelegramPlane/>}/>
                                )
                            }): 'loading'}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Dashboard