import React from 'react'
import { Link } from "react-router-dom";
import { SlTrash, SlPencil } from "react-icons/sl";
import { message, Popconfirm } from 'antd';
import axios from "axios";

const Card = (props) => {
  debugger
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
    return (
        <>
            <div className="card">
                <Link to={props.link}>
                    <i> {props.icon}</i>
                    {/* <FontAwesomeIcon icon={icon['prefix', 'iconName']} /> */}
                    <p className='title'>{props.title}</p>
                </Link>

                {props.isCategory  ? (
                    <>
                        <p>Min. Weight: {props.Item.minWeight}kg</p>
                        <p>Unit Price: {props.Item.unitPrice}kg</p>

                        <div className="btns">
                            <button onClick={() => null} className="edit"><SlPencil /></button>
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