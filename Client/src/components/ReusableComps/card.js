import { Link } from "react-router-dom";
import { SlTrash, SlPencil } from "react-icons/sl";
import { message, Popconfirm, Modal} from 'antd';
import { useState } from "react";
import AddProductCategory from "../../containers/Admin/addProductCategory";

const Card = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteCategory = async()=>{
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: props.Item._id}),
          };
      
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/category`,
            requestOptions
          );
          const data = await response.json();
          
          if (data.msg === 'category deleted successfully') {
            message.success(data.msg)
            props.fetchCategory()
        } else {
            message.error(data.msg)
        }

    }
    
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
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
				<AddProductCategory isEdit={true} item={props.Item} fetchCategory={props.fetchCategory}/>
			</Modal>
		        <div className="card">
                <Link to={props.link}>
                    <i> {props.icon}</i>
                    <p className='title'>{props.title}</p>
                </Link>
                {props.isCategory ? (
                    <>
                        <p>Min. Weight: {props.Item.minWeight} kg</p>
                        <p>Unit Price: Rs. {props.Item.unitPrice}</p>

                        <div className="btns">
                            <button onClick={showModal} className="edit"><SlPencil /></button>
                            <Popconfirm
						        title="Delete Category"
						        description="Are you sure you want to delete this category?"
						        onConfirm={() => deleteCategory()}
					            >
						        <button><SlTrash /></button>
					            </Popconfirm>
                        </div>
                    </>
                ) : ''}
            </div>
        </>
    )
}
export default Card