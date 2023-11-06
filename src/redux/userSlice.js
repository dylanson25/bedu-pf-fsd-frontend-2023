import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../utils/Api";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await Api.post(
      `${process.env.API_END_POINT}login`,
      userCredentials
    );
    const response = await request.data.jwt;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = "Access denied | Invalid credentials";
      });
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
