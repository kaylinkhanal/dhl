import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faUser, faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from 'react-redux';
import { resetDetails } from "../../reducers/userSlice";
import { Button, Drawer, Dropdown, Space } from 'antd';

const Navigation = () => {
    const { userRole, name } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const items = [
        {
            key: '1',
            label: (
                <li>Profile</li>
            ),
        },
        {
            key: '2',
            label: (
                <li onClick={() => logout()}>Logout</li>
            ),
        }
    ]

    // Drawer
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const logout = () => {
        dispatch(resetDetails())
        navigate('/')
    }

    return (
        <>
            {userRole ?
                <div className="navbar">
                    <div className="navbar_left">
                        {userRole === 'user' ? (
                            <ul>
                                <li><Link to="/">Dashboard</Link></li>
                            </ul>
                        ) : userRole === 'rider' ?
                            (
                                <ul>
                                    <li><Link to="/">Dashboard</Link></li>
                                </ul>
                            ) : null}
                    </div>
                    <div className="navbar_right">

                        <ul className="nav_list">
                            {userRole === 'admin' ? (
                                <li>
                                    <Button onClick={showDrawer} className="menu-icon"><FontAwesomeIcon icon={faBars} /></Button>
                                    <Drawer placement="right" onClose={onClose} open={open}>
                                        <ul>
                                            <li><Link to="/">Dashboard</Link></li>
                                        </ul>
                                    </Drawer>
                                </li>
                            ) : null}

                            <li className="user_profile">
                                <Dropdown menu={{ items, }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <i><FontAwesomeIcon icon={faUser} /></i>
                                            <span>{name} <FontAwesomeIcon icon={faChevronDown} /></span>
                                        </Space>
                                    </a>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            : null}
        </>
    )
}
export default Navigation