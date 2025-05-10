import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie, MovieDetails, MovieResponse } from '../../types';
import { 
  fetchTrendingMovies, 
  searchMovies, 
  getMovieDetails 
} from '../../services/tmdbAPI';
import { RootState } from '../../app/store';

interface MoviesState {
  trending: Movie[];
  searchResults: Movie[];
  favorites: Movie[];
  currentMovie: MovieDetails | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
  page: number;
  totalPages: number;
}

const initialState: MoviesState = {
  trending: [],
  searchResults: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  currentMovie: null,
  status: 'idle',
  error: null,
  searchQuery: '',
  page: 1,
  totalPages: 1,
};
export const fetchTrending = createAsyncThunk(
  'movies/fetchTrending',
  async () => {
    const response = await fetchTrendingMovies();
    return response;
  }
);

export const searchMoviesAsync = createAsyncThunk(
  'movies/searchMovies',
  async (query: string, { getState }) => {
    const state = getState() as RootState;
    const response = await searchMovies(query, state.movies.page);
    return response;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (id: number) => {
    const response = await getMovieDetails(id);
    return response;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addToFavorites(state, action: PayloadAction<Movie>) {
      if (!state.favorites.some(movie => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    clearSearchResults(state) {
      state.searchResults = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trending = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch trending movies';
      })
      .addCase(searchMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action: PayloadAction<MovieResponse>) => {
        state.status = 'succeeded';
        state.searchResults = [...state.searchResults, ...action.payload.results];
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(searchMoviesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search movies';
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
        state.currentMovie = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action: PayloadAction<MovieDetails>) => {
        state.status = 'succeeded';
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movie details';
      });
  },
});

export const { 
  setSearchQuery, 
  addToFavorites, 
  removeFromFavorites, 
  clearSearchResults 
} = moviesSlice.actions;

export default moviesSlice.reducer;