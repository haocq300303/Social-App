import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../Services/userService";
import jwtDecode from "jwt-decode";

const initialState = {
  loading: false,
  currentUser: {
    values: {},
    accessToken: "",
  },
  isLogged: false,
  error: "",
};

export const loginAsync = createAsyncThunk(
  "user/login",
  async (values, { rejectWithValue }) => {
    try {
      const data = await login(values);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      state.currentUser.values = {};
      state.currentUser.accessToken = "";
      state.isLogged = false;
    },
    saveUserValues(state, action) {
      state.currentUser.values = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload?.message) {
          state.error = action.payload?.message;
          state.loading = false;
        } else {
          state.currentUser.values = jwtDecode(action.payload?.accessToken);
          state.currentUser.accessToken = action.payload?.accessToken;
          state.error = "";
          state.isLogged = true;
          state.loading = false;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logout, saveUserValues } = userSlice.actions;
export default userSlice.reducer;
