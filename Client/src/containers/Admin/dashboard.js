import React, { useState } from "react";
import AdminNav from "../../components/adminNav"
import { useDispatch, useSelector } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import PendingOrder from "./pendingOrder"
import { useNavigate, Link } from 'react-router-dom'
import {setUserDetailsNull} from '../../reducers/userSlice'


const Dashboard = () => {

    const dispatch = useDispatch()
    const { name } = useSelector(state => state.user)
    const [item, setItem] = useState()

    const displayItem = () => {
        setItem(<PendingOrder />)
    }

    return (
        <>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-warning">
                        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="#" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <h1><span class="fs-5 d-none d-sm-inline">DHL Admin</span></h1>
                            </a>
                            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li class="nav-item">
                                    <div onClick={() => { setItem() }}>
                                        <Link to ="/" class="nav-link align-middle px-0">
                                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => { displayItem() }}>
                                        <a href="#" class="nav-link px-0 align-middle">
                                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Pending Orders</span></a>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => { }}>
                                        <a href="#" class="nav-link px-0 align-middle">
                                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Orders Status</span></a>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => { }}>
                                        <a href="#" class="nav-link px-0 align-middle">
                                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline"> Approved Orders</span></a>
                                    </div>
                                </li>
                            </ul>
                            <hr />
                            <div class="dropdown pb-4">
                                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle" />
                                    <span class="d-none d-sm-inline mx-1" style={{fontWeight: 'bolder'}}>{name}</span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-success text-small shadow">
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li><a class="dropdown-item" href="#">Settings</a></li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li><a class="dropdown-item" onClick={() => {dispatch(setUserDetailsNull())}}>Log out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col py-3">
                        {item}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard