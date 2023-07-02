import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  savedAnime: []
};

const recentlyWatchedSlice = createSlice({
  name: "recentlyWatched",
  initialState,
  reducers: {
    addEpisode: (state, action) => {
      const episode = action.payload;
      const animeId = episode.animeId;

      // Find the index of the TV show by its tvid
      const showIndex = state.items.findIndex(
        (item) => item.animeId === animeId
      );

      if (showIndex === -1)
      {
        // Initialize watchTime to 0 when adding a new episode
        state.items.unshift({ animeId, episode, watchTime: 0 });
      } else
      {
        // TV show already exists, update its episode if it's different
        if (state.items[showIndex].episode.id !== episode.id) {
          state.items[showIndex].episode = episode;
        }
      }

      // Remove the oldest TV show if there are more than 10 TV shows in the state
      if (state.items.length > 10) {
        state.items.pop();
      }

      // Save the state to the local storage
      localStorage.setItem("tvShowsState", JSON.stringify(state));
    },

    deleteEpisode: (state, action) => {
      const animeId = action.payload;

      // Find the index of the TV show by its tvid
      const showIndex = state.items.findIndex(
        (item) => item.animeId === animeId
      );

      if (showIndex !== -1)
      {
        console.log('exists')
        // Remove the TV show from the array
        state.items.splice(showIndex, 1);

        // Save the state to the local storage
        localStorage.setItem("tvShowsState", JSON.stringify(state));
      }
    },


    updateRecentlyWatched: (state, action) => {
      const { animeId, watchTime } = action.payload;

      const showIndex = state.items.findIndex((item) => item.animeId === animeId);

      if (showIndex !== -1)
      {
        // Update the watchTime property if the episode exists
        state.items[showIndex].episode.watchTime = watchTime;
        localStorage.setItem("tvShowsState", JSON.stringify(state));
      }
    },
  },
});

export const { addEpisode, updateWatchTime, deleteEpisode, updateRecentlyWatched, updateSavedEpisode } =
  recentlyWatchedSlice.actions;
export default recentlyWatchedSlice.reducer;
