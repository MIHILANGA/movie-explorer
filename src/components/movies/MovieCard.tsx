import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Chip,
  Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { Movie } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToFavorites, removeFromFavorites } from '../../features/movies/moviesSlice';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  showFavorite?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showFavorite = true }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.movies.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <Card
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        },
        textDecoration: 'none',
      }}
      elevation={3}
    >
      <CardMedia
        component="img"
        height="340"
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/no-poster.jpg'
        }
        alt={movie.title}
        sx={{
          objectFit: 'cover',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Box display="flex" alignItems="center" mr={2}>
            <StarIcon fontSize="small" color="warning" />
            <Typography variant="body2" ml={0.5}>
              {movie.vote_average?.toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.substring(0, 4) || 'N/A'}
          </Typography>
        </Box>
        {movie.genre_ids && movie.genre_ids.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {movie.genre_ids.slice(0, 2).map((genreId) => (
              <Chip
                key={genreId}
                label={
                  genreId === 28 ? 'Action' :
                  genreId === 12 ? 'Adventure' :
                  genreId === 16 ? 'Animation' :
                  genreId === 35 ? 'Comedy' : 'Other'
                }
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </CardContent>
      {showFavorite && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <IconButton
              onClick={handleToggleFavorite}
              color={isFavorite ? 'error' : 'default'}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Card>
  );
};

export default MovieCard;