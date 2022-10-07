import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
};

export const getPosts = createAsyncThunk("posts/getposts", async (userId) => {
  const res = await axios.post("http://localhost:8080/api/posts/timeline/all", {
    userId: userId,
  });
  return res.data;
});

// export const getPostsForUser = createAsyncThunk(
//   "posts/getposts",
//   async (userId) => {
//     const res = await axios.post(
//       "http://localhost:8080/api/posts/timeline/all",
//       {
//         userId: userId,
//       }
//     );
//     return res.data;
//   }
// );

const postsSlice = createSlice({
  name: "posts",
  initialState,
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
