import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Chip, 
  Divider, 
  IconButton, 
  Paper, 
  Container,
  Stack,
  Skeleton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MovieDetails } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToFavorites, removeFromFavorites } from '../../features/movies/moviesSlice';
import MovieTrailer from './MovieTrailer';
import { format } from 'date-fns';

interface MovieDetailsProps {
  movie: MovieDetails;
}

 const MovieDetailsComponent: React.FC<MovieDetailsProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.movies.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/no-poster.jpg'
              }
              alt={movie.title}
              sx={{ 
                width: '100%', 
                borderRadius: 2,
                boxShadow: 3,
                maxHeight: 500,
                objectFit: 'cover'
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="h3" component="h1" gutterBottom>
                {movie.title}
              </Typography>
              <IconButton 
                onClick={handleToggleFavorite}
                color={isFavorite ? 'error' : 'default'}
                size="large"
                sx={{ ml: 2 }}
              >
                <FavoriteIcon fontSize="large" />
              </IconButton>
            </Stack>
            
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', rowGap: 1 }}>
              <Chip 
                label={movie.release_date 
                  ? format(new Date(movie.release_date), 'yyyy') 
                  : 'N/A'} 
                variant="outlined" 
              />
              <Chip 
                label={`★ ${movie.vote_average?.toFixed(1)}`} 
                color="primary" 
              />
              {movie.runtime && (
                <Chip 
                  label={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`} 
                  variant="outlined" 
                />
              )}
              {movie.genres?.map((genre) => (
                <Chip 
                  key={genre.id} 
                  label={genre.name} 
                  variant="outlined"
                />
              ))}
            </Stack>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Overview
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.overview || 'No overview available.'}
            </Typography>
            
            {movie.tagline && (
              <Typography variant="body2" color="text.secondary" fontStyle="italic" paragraph>
                "{movie.tagline}"
              </Typography>
            )}
            
            <MovieTrailer movie={movie} />
          </Grid>
        </Grid>
      </Paper>
      
      {movie.credits?.cast.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Top Cast
          </Typography>
          <Grid container spacing={2}>
            {movie.credits.cast.slice(0, 6).map((person) => (
              <Grid item xs={6} sm={4} md={2} key={person.id}>
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={person.profile_path 
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}` 
                      : '/no-avatar.jpg'}
                    alt={person.name}
                    sx={{ 
                      width: '100%', 
                      height: 'auto',
                      borderRadius: '50%',
                      mb: 1,
                      aspectRatio: '1/1',
                      objectFit: 'cover'
                    }}
                  />
                  <Typography variant="subtitle2" noWrap>{person.name}</Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {person.character}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default MovieDetailsComponent;
