import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    width : "20px"
};

const BoxSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    changeWidth: (state, actions) => {
        state.width = actions.payload + 'px'
        // console.log('action   :' + actions)
        console.log('actionPaylod    :'+ actions.payload)
    },

  }
});

export const { changeWidth} = BoxSlice.actions;
export default BoxSlice.reducer;