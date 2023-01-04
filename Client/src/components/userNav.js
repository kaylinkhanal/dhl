import React from 'react'
import './userNav.css'
import { useDispatch, useSelector } from "react-redux"
import {setUserDetailsNull} from '../reducers/userSlice'

const UserNav = () => {
    const dispatch = useDispatch()

    return (
        <>
            <nav class="navbar">
                <div class="navbar-container container">
                    <input type="checkbox" name="" id=""/>
                        <div class="hamburger-lines">
                            <span class="line line1"></span>
                            <span class="line line2"></span>
                            <span class="line line3"></span>
                        </div>
                        <ul class="menu-items">
                            <li><a href="#">Notification</a></li>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Change Password</a></li>
                            <li><a onClick={() => {dispatch(setUserDetailsNull())}}>Logout</a></li>
                        </ul>
                        <h1 class="logo">DHL App</h1>
                </div>
            </nav>
        </>
    )
}
export default UserNav;