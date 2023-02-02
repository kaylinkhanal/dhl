import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderLocationDetails: {},
  recepientLocationDetails: {},
  senderAddress: "",
  receipentAddress: "",
  currentDistance: 0,
};
// features.properties.formatted/
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderLocationDetails: (state, actions) => {
      state.senderLocationDetails = actions.payload;
    },
    setRecepientLocationDetails: (state, actions) => {
      state.recepientLocationDetails = actions.payload;
    },
    setCurrentDistance: (state, actions) => {
      state.currentDistance = actions.payload;
    },
    setSenderAddress: (state, actions) => {
      state.senderAddress = actions.payload;
    },
    setReceipentAddress: (state, actions) => {
      state.receipentAddress = actions.payload;
    },
  },
});

export const {
  setSenderLocationDetails,
  setRecepientLocationDetails,
  setCurrentDistance,
  setSenderAddress,
  setReceipentAddress
} = locationSlice.actions;
export default locationSlice.reducer;
