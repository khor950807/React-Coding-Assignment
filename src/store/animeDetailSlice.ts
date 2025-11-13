import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnimeDetailsApi } from "../api/AnimeApi";
import type { AnimeDetailState } from "../types/AnimeInterface";

export const fetchAnimeDetails = createAsyncThunk(
  "animeDetail/fetchAnimeDetails",
  async (id: string) => {
    const response = await fetchAnimeDetailsApi(id);
    return response;
  }
);

const initialState: AnimeDetailState = {
  anime: null,
  loading: false,
  error: null,
};

const animeDetailSlice = createSlice({
  name: "animeDetail",
  initialState,
  reducers: {
    clearAnimeDetail: (state) => {
      state.anime = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        
        state.loading = false;
        state.anime = action.payload.data;
      })
      .addCase(fetchAnimeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { clearAnimeDetail } = animeDetailSlice.actions;
export default animeDetailSlice.reducer;

