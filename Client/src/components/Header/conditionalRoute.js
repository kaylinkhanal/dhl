import React from "react";
import Register from "../../containers/Auth/register";
import Login from "../../containers/Auth/login";
import UserDashboard from "../../containers/User/dashboard"
import AdminDashboard from "../../containers/Admin/dashboard"
import RiderDashboard from "../../containers/Rider/dashboard"
import Orders from "../../containers/User/orders";
import OrdersList from "../../containers/User/userOrdersList";
import AdminOrdersList from "../../containers/Admin/adminOrdersList";
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import ChangePassword from "../Forms/changePassword";
import Portfolio from "../../containers/SharedScreens/profile";
import ErrorPage from "../../containers/ErrorPage/error";
import TrackDelivery from "../../containers/TrackOrder/trackDelivery";

const ConditionalRouting = () => {
  const { userRole } = useSelector(state => state.user)
  if (userRole === 'user') {
    return <UserScreen />
  } else if (userRole === 'rider') {
    return <RiderScreen />
  } else if (userRole === 'admin') {
    return (<AdminScreen />)
  } else {
    return <AuthScreens />
  }
}

const AuthScreens = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/trackdelivery" element={<TrackDelivery />} />
    </Routes>
  )
}

const RiderScreen = () => {
  return (
    <Routes>
      <Route exact path='/' element={<RiderDashboard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

const UserScreen = () => {
  return (
    <Routes>
      <Route exact path='/' element={<UserDashboard />} />
      <Route exact path='/orders' element={<Orders />} />
      <Route exact path='/UserOrderslist' element={<OrdersList />} />
      <Route exact path='/changepassword' element={<ChangePassword />} />
      <Route path='/portfolio/:name' element={<Portfolio />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>

  )
}
const AdminScreen = () => {
  return (
    <Routes>
      <Route exact path='/' element={<AdminDashboard />} />
      <Route exact path='/changepassword' element={<ChangePassword />} />
      <Route path='/ordersdata' element={<AdminOrdersList />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default ConditionalRouting

