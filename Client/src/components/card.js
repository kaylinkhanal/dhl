import React from 'react'
import { faDolly, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(
    faDolly,
    faPaperPlane
);

const Card = (props)=>{
    console.log(props.icon)
    return(
        <>
            <div className="card">
                <Link to={props.link}>
                    <i><FontAwesomeIcon icon={props.icon[`prefix`, `iconName`]} /></i>
                    <p>{props.title}</p>
                </Link>
            </div>
        </>
    )
}
export default Card