import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineChevronDown, HiOutlineUser } from "react-icons/hi";
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
            label: <Link to={`/portfolio/${name}`}>Portfolio</Link>,
        },

        {
            key: "2",
            label: <Link to='/changepassword'>Change Password</Link>,
        },

        {
            key: '3',
            label: <button onClick={() => logout()}>Logout</button>,
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
                                    <Button onClick={showDrawer} className="menu-icon"><HiOutlineMenuAlt3 /></Button>
                                    <Drawer placement="right" onClose={onClose} open={open}>
                                        <ul>
                                            <li onClick={onClose}><Link to="/">Dashboard</Link></li>
                                            <li onClick={onClose}><Link to="/ordersdata">Orders</Link></li>
                                        </ul>
                                    </Drawer>
                                </li>
                            ) : null}

                            <li className="user_profile">
                                <Dropdown menu={{ items }}>
                                    <span onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <i><HiOutlineUser /></i>
                                            <span>{name} <HiOutlineChevronDown /></span>
                                        </Space>
                                    </span>
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