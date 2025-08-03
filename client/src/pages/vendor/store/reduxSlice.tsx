// src/store/vendorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendor: null,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },
    clearVendor: (state) => {
      state.vendor = null;
    },
  },
});

export const { setVendor, clearVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
