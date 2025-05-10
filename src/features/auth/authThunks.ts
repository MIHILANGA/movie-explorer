import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../services/authService';
import { User } from '../../types';
import { RootState } from '../../app/store';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials.username, credentials.password);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { getState }) => {
    const state = getState() as RootState;
    return state.auth.isAuthenticated;
  }
);