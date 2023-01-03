import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPost } from "../Services/postService";
const initialState = {
  posts: [],
  isLoading: false,
  isLoadingDelete: false,
};

export const getPosts = createAsyncThunk("posts/getposts", async (userId) => {
  const data = await getAllPost(userId);
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postsSlice.reducer;
