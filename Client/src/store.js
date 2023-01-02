import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from 'redux-logger'
import orderSlice from "./reducers/orderSlice";
import userSlice from "./reducers/userSlice";
const reducer = combineReducers({
  user: userSlice,
  orderList:orderSlice 
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
