import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: '',
  email:'',
  token: '',
  userRole: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
     const {name, email,userRole, token} = actions.payload
        state.name = name
        state.email= email 
        state.userRole = userRole
        state.token = token
    },
    resetDetails: (state, actions) => {
         state.name =''
         state.email=''
         state.userRole =''
         state.token =''
     },
  }
});

export const { setUserDetails, resetDetails } = userSlice.actions;
export default userSlice.reducer;


