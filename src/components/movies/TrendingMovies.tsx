import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTrending } from '../../features/movies/moviesSlice';
import MovieGrid from './MovieGrid';
import { Box, Typography } from '@mui/material';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorAlert from '../ui/ErrorAlert';

const TrendingMovies: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trending, status, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (trending.length === 0) {
      dispatch(fetchTrending());
    }
  }, [dispatch, trending.length]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <Box>
      <MovieGrid movies={trending} />
    </Box>
  );
};

export default TrendingMovies;