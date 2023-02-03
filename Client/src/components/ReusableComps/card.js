import React from 'react'
import { Link } from "react-router-dom";
import { SlTrash, SlPencil } from "react-icons/sl";

const Card = (props) => {
    return (
        <>
            <div className="card">
                <Link to={props.link}>
                    <i> {props.icon}</i>
                    {/* <FontAwesomeIcon icon={icon['prefix', 'iconName']} /> */}
                    <p className='title'>{props.title}</p>
                </Link>
                {props.isCategory ? (
                    <>
                        <p>Min. Weight: {props.Item.minWeight}kg</p>
                        <p>Unit Price: {props.Item.unitPrice}kg</p>

                        <div className="btns">
                            <button onClick={() => null} className="edit"><SlPencil /></button>
                            <button onClick={() => null} className="delete"><SlTrash /></button>
                        </div>
                    </>
                ) : ''}
            </div>
        </>
    )
}
export default Card