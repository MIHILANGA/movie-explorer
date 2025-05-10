import React, { useEffect, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { getMovieTrailer } from '../../services/tmdbAPI';
import { MovieDetails } from '../../types';

interface MovieTrailerProps {
  movie: MovieDetails;
}

const MovieTrailer: React.FC<MovieTrailerProps> = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const key = await getMovieTrailer(movie.id);
        setTrailerKey(key);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height={400} />;
  }

  if (!trailerKey) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Trailer
      </Typography>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          paddingTop: '56.25%', // 16:9 aspect ratio
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <iframe
          title={`${movie.title} Trailer`}
          src={`https://www.youtube.com/embed/${trailerKey}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default MovieTrailer;