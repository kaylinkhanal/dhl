import React from "react";
import "./App.css";
import Register from "./containers/Auth/register";
import Login from "./containers/Auth/login";
import UserDashboard from "./containers/User/dashboard";
import AdminDashboard from "./containers/Admin/dashboard";
import RiderDashboard from "./containers/Rider/dashboard";
import Orders from "./containers/User/orders";
import OrdersList from "./containers/User/ordersList";

import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import OrderCard from "./components/orderCard";

const App = () => {
  return (
    <Router>
      <ConditionalRouting/>
      {/* <OrderCard /> */}
    </Router>
  );
};

const ConditionalRouting = () => {
  const { userRole } = useSelector((state) => state.user);
  if (userRole === "user") {
    return <UserScreen />;
  } else if (userRole === "rider") {
    return <RiderScreen />;
  } else if (userRole === "admin") {
    return <AdminScreen />;
  } else {
    return <AuthScreens />;
  }
};

const AuthScreens = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
};

const RiderScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<RiderDashboard />} />
    </Routes>
  );
};

const UserScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserDashboard />} />
      <Route exact path="/orders" element={<Orders />} />
      <Route exact path="/orderslist" element={<OrdersList />} />
    </Routes>
  );
};
const AdminScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
