import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedAnime: []
};

const savedAnimeSlice = createSlice({
  name: "recentlyWatched",
  initialState,
  reducers: {
    syncAnime: (state, action) => {
      return {
        ...state,
        savedAnime: action.payload,
      };
    }
  },
});

export const { syncAnime } =
  savedAnimeSlice.actions;
export default savedAnimeSlice.reducer;
