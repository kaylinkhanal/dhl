import React from 'react'
import { Link } from "react-router-dom";
// library.add(
//     FaDolly,
//     FaTelegramPlane
// );

const Card = ({icon, title, link})=>{
    return(
        <>
            <div className="card">
                <Link to={link}>
                    <i> {icon}</i>
                    {/* <FontAwesomeIcon icon={icon['prefix', 'iconName']} /> */}
                    <p>{title}</p>
                </Link>
            </div>
        </>
    )
}
export default Card