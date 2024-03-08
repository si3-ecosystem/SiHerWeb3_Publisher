import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  websiteData: null,
};

const contentReducer = createSlice({
  name: "content",
  initialState,
  reducers: {
    handleWebsiteData: (state, action) => {
      console.log(action.payload);
      state.websiteData = action.payload;
    },
  },
});
export const { handleWebsiteData } = contentReducer.actions;
export default contentReducer.reducer;
