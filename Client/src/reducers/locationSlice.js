import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderLocationDetails: {},
  recepientLocationDetails: {},
  senderAddress: '',
  recepientAddress: '',
  currentDistance: 0
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderLocationDetails: (state, actions) => {
      state.senderLocationDetails = actions.payload
    },
    setRecepientLocationDetails: (state, actions) => {
      state.recepientLocationDetails = actions.payload
    },
    setCurrentDistance: (state, actions) => {
      state.currentDistance = actions.payload
    },
    setSenderAddress: (state, actions) => {
      state.senderAddress = actions.payload
    },
    setRecepientAddress: (state, actions) => {
      state.recepientAddress = actions.payload
    },
  }
});

export const { setSenderLocationDetails, setRecepientLocationDetails, setCurrentDistance, setSenderAddress, setRecepientAddress } = locationSlice.actions;
export default locationSlice.reducer;


