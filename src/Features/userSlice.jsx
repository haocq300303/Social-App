import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOneUser } from "../Services/userService";

const initialState = {
  data: {},
  isLoading: true,
};

export const getInfoUser = createAsyncThunk(
  "user/getInfoUser",
  async (userId) => {
    const data = await getOneUser(userId);
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getInfoUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getInfoUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
