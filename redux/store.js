import { configureStore } from "@reduxjs/toolkit";
import recentlyWatchedReducers from "./reducers/recentlyWatchedReducers";
import syncAnimeReducers from "./reducers/savedAnime";
const store = configureStore({
  reducer: {
    recentlyWatched: recentlyWatchedReducers,
    syncAnime: syncAnimeReducers,
  },
});
export default store;
