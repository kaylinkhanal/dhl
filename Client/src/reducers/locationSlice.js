import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderLocationDetails: [],
  receipentLocationDetails:[],
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderLocationDetails: (state, actions) => {
        state.senderLocationDetails= actions.payload 
    },
    setReceipentLocationDetails: (state, actions) => {
        state.receipentLocationDetails= actions.payload
     },
  }
});

export const { setSenderLocationDetails, setReceipentLocationDetails } = locationSlice.actions;
export default locationSlice.reducer;


