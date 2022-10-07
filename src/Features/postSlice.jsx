import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  like: {
    quantity: null,
    liked: false,
  },
  comment: {
    quantity: null,
    data: [],
  },
  share: {
    quantity: null,
    data: [],
  },
};

export const likePost = createAsyncThunk(
  "post/likePost",
  async (idPost, userId) => {
    const res = await axios.put(
      `http://localhost:8080/api/posts/${idPost}/like`,
      {
        userId,
      }
    );
    return res.data.quantity;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(likePost.pending, (state) => {
        state.like.liked = false;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.like.quantity = action.payload;
        state.like.liked = true;
      });
  },
});

export default postSlice.reducer;
