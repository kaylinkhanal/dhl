import React from 'react'
import { faDolly, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(
    faDolly,
    faPaperPlane
);

const Card = ({icon, title, link})=>{
    return(
        <>
            <div className="card">
                <Link to={link}>
                    <i><FontAwesomeIcon icon={icon[`prefix`, `iconName`]} /></i>
                    <p>{title}</p>
                </Link>
            </div>
        </>
    )
}
export default Card