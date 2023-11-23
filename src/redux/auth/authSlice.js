import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from ".";
import { getItem, setItem } from "../../utils/localStorage";
import Api from "../../utils/Api";

const initialState = {
  status: "checking", // 'checking', 'not-authenticated', 'authenticated'
  loading: false,
  user: getItem("AH"),
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAUTH: (state) => {
      if (getItem("AH")) state.status = "authenticated";
      else state.status = "not-authenticated";
    },
    setAUTH: (state, payload) => {
      const { payload: p } = payload;
      const data = {
        email: p.email,
        fullName: p.fullName,
        Authorization: p.jwt,
      };
      setItem("AH", data);
      state.user = data;
      state.status = "authenticated";
      Api.Authorization = data.Authorization;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = "Access denied | Invalid credentials";
      });
  },
});

export const { checkAUTH, setAUTH } = authSlice.actions;
