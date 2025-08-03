// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./reduxSlice";

const store = configureStore({
  reducer: {
    vendor: vendorReducer,
  },
});

export default store;
