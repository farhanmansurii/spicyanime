import { configureStore } from "@reduxjs/toolkit";
import recentlyWatchedReducers from "./reducers/recentlyWatchedReducers";
const store = configureStore({
  reducer: {
    recentlyWatched: recentlyWatchedReducers,
  },
});
export default store;
