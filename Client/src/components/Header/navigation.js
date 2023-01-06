import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSelector, useDispatch} from 'react-redux';
import { resetDetails } from "../../reducers/userSlice";

const Navigation = ()=>{
    const {userRole} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = ()=>{
        dispatch(resetDetails())
        navigate('/')
    }
    return(
        <>
            {userRole ? 
                <div className="navbar">
                    <div className="navbar_left">
                        {userRole === 'user' ? (
                            <ul>
                                <li><Link to="/">Dashboard</Link></li>
                            </ul>
                        ): userRole === 'rider' ?
                        (
                            <ul>
                                <li><Link to="/">Dashboard</Link></li>
                            </ul>
                        ): null}
                    </div>
                    <div className="right">
                        <ul className="nav_list">
                            <li className="user_profile"><FontAwesomeIcon icon={faUser} /></li>
                            <li onClick={() => logout()}><i><FontAwesomeIcon icon={faRightFromBracket} /></i></li>
                        </ul>
                    </div>
                </div>
            : null}
        </>
        
    )
}
export default Navigation