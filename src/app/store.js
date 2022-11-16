import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import userReducer from "../Features/userSlice";
import postsReducer from "../Features/postsSlice";
import postsForUserReducer from "../Features/postsForUserSlice";

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  postsForUser: postsForUserReducer,
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
