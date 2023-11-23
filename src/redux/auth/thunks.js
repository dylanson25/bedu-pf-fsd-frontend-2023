import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/Api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials) => {
    const { data } = await Api.post(`login`, userCredentials);
    return data;
  }
);
