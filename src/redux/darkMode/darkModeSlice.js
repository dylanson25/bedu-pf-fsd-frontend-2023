import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../utils/localStorage";

const initialState = {
  DARK: Number(getItem("DARK", false) || 0),
};

export const darkModeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDarkMode: (state, { payload }) => {
      setItem("DARK", payload, false);
      state.DARK = payload;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;
