import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTrendingMovies, getMovieDetails, searchMovies } from '../../services/tmdbAPI';
import { MovieResponse } from '../../types';
import { RootState } from '../../app/store';

export const fetchTrending = createAsyncThunk(
  'movies/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTrendingMovies();
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
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
