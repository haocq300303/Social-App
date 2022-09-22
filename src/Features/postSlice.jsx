import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  like: null,
  comment: {
    quantity: null,
    data: [],
  },
  share: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    likePost: (state, action) => {
      state.like = action.payload;
    },
    commentPost: (state, action) => {
      state.comment.quantity = action.payload.qunatity;
      state.comment.data.push(action.payload);
    },
    sharePost: (state, action) => {
      state.like = action.payload;
    },
  },
});

export const { likePost, commentPost, sharePost } = postSlice.actions;

export default postSlice.reducer;
