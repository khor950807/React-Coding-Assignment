import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchAnimeList } from "../api/AnimeApi";
import type { AnimeState } from "../types/AnimeInterface";

const initialState: AnimeState = {
  animes: [],
  loading: false,
  error: {},
  currentPage: 1,
  pageLimit: 5,
  totalFound: 0,
  sortBy: "asc",
  orderBy: "popularity",
  lastPage: 1,
  selectedRating: "all",
  selectedType: "all",
  searchTerm: ""
};

export const fetchAnimes = createAsyncThunk(
  "anime/fetchAnimes",
  async (_, { getState }) => {
    const state = getState() as { anime: AnimeState }
    const { currentPage, pageLimit, sortBy, orderBy, selectedRating, selectedType, searchTerm } = state.anime;

    const pagination: any = {
      page: currentPage,
      limit: pageLimit,
      sort: sortBy,
      order_by: orderBy,
    };

    if (selectedRating !== "all") {
      pagination.rating = selectedRating;
    }

    if (selectedType !== "all") {
      pagination.type = selectedType;
    }

    if (searchTerm) {
      pagination.q = searchTerm;
    }

    const response = await fetchAnimeList(pagination);

    return response;
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageLimit: (state, action: PayloadAction<number>) => {
      state.pageLimit = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
      state.currentPage = 1;
    },
    setSelectedRating: (state, action: PayloadAction<string>) => {
      state.selectedRating = action.payload;
      state.currentPage = 1;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
      state.currentPage = 1;
    },
    searchAnime: (state, action: PayloadAction<any>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        if (!action.payload) return;
        /* Infinite Loader */
        // if(state.currentPage == 1) {
        //   state.animes = action.payload.data;
        // } else {
        //   state.animes = [...state.animes, ...action.payload.data];
        // }
        /* End Infinite Loader */
        state.loading = false;
        state.animes = action.payload.data;
        state.lastPage = action.payload.pagination.last_visible_page;
        state.totalFound = action.payload.pagination.items.total;
      })
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
  },
})

export const {
  setCurrentPage,
  setPageLimit,
  setSortBy,
  setOrderBy,
  setSelectedRating,
  setSelectedType,
  searchAnime
} = animeSlice.actions;

export default animeSlice.reducer;