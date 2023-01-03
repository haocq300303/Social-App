import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice";
import postsReducer from "../Features/postsSlice";
import postsForUserReducer from "../Features/postsForUserSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    postsForUser: postsForUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
