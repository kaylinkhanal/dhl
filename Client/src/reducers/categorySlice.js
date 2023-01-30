import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  productCategories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setProductCategories: (state, actions) => {
    state.productCategories = actions.payload
    },
  }
});

export const { setProductCategories } = categorySlice.actions;
export default categorySlice.reducer;


