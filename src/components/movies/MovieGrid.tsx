import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import { Movie } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, isLoading = false }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (movies.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="h6">No movies found</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;