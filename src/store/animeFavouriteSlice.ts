import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FavouriteState {
  favourite_anime_ids: any,
  total_favourite_ids: number,
  loading: boolean,
  error: any,
}

const STORAGE_KEY = "favourite_anime_list";

const loadFavouriteIds = (): {} => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return [];
  }
};

const countFavouriteIds = (): number => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? Object.keys(JSON.parse(data)).length : 0;
  } catch {
    return 0;
  }
};

const saveFavouriteIds = (anime_mal_ids: {}) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(anime_mal_ids));
};

const initialState: FavouriteState = {
  favourite_anime_ids: loadFavouriteIds(),
  total_favourite_ids: countFavouriteIds(),
  loading: false,
  error: {},
};

const animeFavouriteSlice = createSlice({
  name: "animeFavourite",
  initialState,
  reducers: {
    addToFavouritelist: (state, action: PayloadAction<any>) => {
      if (!state.favourite_anime_ids[action.payload.mal_id]) {
        state.favourite_anime_ids[action.payload.mal_id] = action.payload;
        saveFavouriteIds(state.favourite_anime_ids);
        state.total_favourite_ids = countFavouriteIds();
      }
    },
    removeFromFavouritelist: (state, action: PayloadAction<number>) => {
      delete state.favourite_anime_ids[action.payload];
      saveFavouriteIds(state.favourite_anime_ids);
      state.total_favourite_ids = countFavouriteIds();
    },
    toggleFavouritelist: (state, action: PayloadAction<any>) => {
      if (state.favourite_anime_ids[action.payload.mal_id]) {
        delete state.favourite_anime_ids[action.payload.mal_id];
      } else {
        state.favourite_anime_ids[action.payload.mal_id] = action.payload;
      }
      saveFavouriteIds(state.favourite_anime_ids);
      state.total_favourite_ids = countFavouriteIds();
    },
    clearFavouritelist: (state) => {
      state.favourite_anime_ids = {};
      state.total_favourite_ids = 0;
      localStorage.removeItem(STORAGE_KEY);
    },
  }
});

export const { addToFavouritelist, removeFromFavouritelist, toggleFavouritelist, clearFavouritelist } = animeFavouriteSlice.actions;

export default animeFavouriteSlice.reducer;