import React from 'react'
import { faCartShopping, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Card = (props)=>{
    return(
        <>
            <div className="card">
                <Link to="/orders">
                    <i><FontAwesomeIcon icon={props.icon}/></i>
                    <p>{props.title}</p>
                </Link>
            </div>
        </>
    )
}
export default Card