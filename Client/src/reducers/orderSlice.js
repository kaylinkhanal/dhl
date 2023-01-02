import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  productType: "",
  senderName: "",
  reciverName: "",
  senderLocation: "",
  reciverLocation: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderrDetails: (state, actions) => {
      const {
        productType,
        senderName,
        reciverName,
        senderLocation,
        reciverLocation,
      } = actions.payload;
      state.productType = productType;
      state.senderName = senderName;
      state.reciverName = reciverName;
      state.senderLocation = senderLocation;
      state.reciverLocation = reciverLocation;
    },
  },
});

export const { setOrderrDetails } = orderSlice.actions;
export default orderSlice.reducer;
