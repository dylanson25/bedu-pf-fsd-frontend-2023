import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { darkModeSlice } from "./darkMode";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    darkMode: darkModeSlice.reducer,
  },
});

export default store;
