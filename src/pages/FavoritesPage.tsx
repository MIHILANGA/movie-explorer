import React from 'react';
import { useAppSelector } from '../app/hooks';
import MovieGrid from '../components/movies/MovieGrid';
import { Box, Typography } from '@mui/material';

const FavoritesPage: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.movies);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Your Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1">
          You haven't added any movies to your favorites yet.
        </Typography>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Box>
  );
};

export default FavoritesPage;