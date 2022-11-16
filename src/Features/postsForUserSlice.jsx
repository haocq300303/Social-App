import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPostForOneUser } from "../Services/postService";
const initialState = {
  posts: [],
  isLoading: false,
  isLoadingDelete: false,
};

export const getPostsForUser = createAsyncThunk(
  "postsForUser/getposts",
  async (userId) => {
    const data = await getAllPostForOneUser(userId);
    return data;
  }
);

const postsForUserSlice = createSlice({
  name: "postsForUser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPostsForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsForUser.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostsForUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postsForUserSlice.reducer;
