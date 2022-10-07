import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import userReducer from "../Features/userSlice";
import postReducer from "../Features/postSlice";
import postsReducer from "../Features/postsSlice";

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  post: postReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
