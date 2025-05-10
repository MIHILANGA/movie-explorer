import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchMovieDetails } from '../features/movies/moviesSlice';
import MovieDetails from '../components/movies/MovieDetails';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentMovie, status, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(parseInt(id)));
    }
  }, [id, dispatch]);

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!currentMovie) return null;

  return <MovieDetails movie={currentMovie} />;
};

export default MoviePage;