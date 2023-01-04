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
    setUserDetailsNull: (state, action) =>{
      state.name = ''
      state.userRole = ''
    }
  }
});

export const { setUserDetails, setUserDetailsNull } = userSlice.actions;
export default userSlice.reducer;


