import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderLocationDetails: {},
  recepientLocationDetails: {},
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
      setCurrentDistance:  (state, actions) => {
        state.currentDistance = actions.payload
        },
  }
});

export const { setSenderLocationDetails, setRecepientLocationDetails,setCurrentDistance } = locationSlice.actions;
export default locationSlice.reducer;


