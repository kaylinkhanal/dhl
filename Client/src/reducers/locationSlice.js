import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderLocationDetails: {},
  recepientLocationDetails: {}
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
  }
});

export const { setSenderLocationDetails, setRecepientLocationDetails } = locationSlice.actions;
export default locationSlice.reducer;


