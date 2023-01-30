import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProductCategory from "./addProductCategory";
import { Modal } from 'antd';
import CategoryListTable from "../../components/categoryListingTable";
import { setProductCategories } from "../../reducers/categorySlice";

const Dashboard = ()=>{
    const {name} = useSelector(state=> state.user)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState([])

    const dispatch = useDispatch()
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
    
    dispatch(setProductCategories(category))
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
                            <CategoryListTable category={category}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Dashboard