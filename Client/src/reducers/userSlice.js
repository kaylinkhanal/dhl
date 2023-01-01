import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: '',
  token: '',
  userRole: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
     const {name, userRole} = actions.payload
        state.name =name
        state.userRole =userRole
    },
  }
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;


