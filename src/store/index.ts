import { configureStore } from "@reduxjs/toolkit"
import animeReducer from "./animeSlice"
import animeDetailReducer from "./animeDetailSlice";
import animeFavouriteReducer from "./animeFavouriteSlice";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    animeDetail: animeDetailReducer,
    animeFavourite: animeFavouriteReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch