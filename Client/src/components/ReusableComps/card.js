import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { SlTrash, SlPencil } from "react-icons/sl";
import { message, Popconfirm, Modal } from 'antd';
import axios from "axios";
import AddProductCategory from '../../containers/Admin/addProductCategory';

const Card = (props) => {

	const [isModalOpen, setIsModalOpen] = useState(false);
  
    const confirm = (e) => {
    
        axios
            .delete(`${process.env.REACT_APP_BASE_URL}/category`, {
                data: { id: props.Item._id },
            })
            .then((response) => (response ? props.fetch() : null))
            .catch((error) => {
                console.error("There was an error!", error);
            });

        message.success('Deleted Sucessfully');
    };
    const cancel = (e) => {
        message.error('Not Deleted');
    };


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
            <div className="card">
                <Link to={props.link}>
                    <i> {props.icon}</i>
                    {/* <FontAwesomeIcon icon={icon['prefix', 'iconName']} /> */}
                    <p className='title'>{props.title}</p>
                </Link>
                
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
				<AddProductCategory isEdit={true} item={props.Item} onOk={handleOk} />
			</Modal>
                {props.isCategory  ? (
                    <>
                        <p>Min. Weight: {props.Item.minWeight}kg</p>
                        <p>Unit Price: {props.Item.unitPrice}kg</p>

                        <div className="btns">
                        <button onClick={showModal}><i><SlPencil /></i></button>

                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <SlTrash />
                            </Popconfirm>
                        </div>
                 
                    </>

                    
                ) : ''}
            </div>
        </>
    )
}
export default Card