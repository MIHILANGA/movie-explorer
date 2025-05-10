import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  fetchTrending, 
  searchMoviesAsync, 
  clearSearchResults,
  setSearchQuery 
} from '../features/movies/moviesSlice';
import { Box, Container, Typography } from '@mui/material';
import SearchBar from '../components/search/SearchBar';
import MovieGrid from '../components/movies/MovieGrid';
import TrendingMovies from '../components/movies/TrendingMovies';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert';
import SearchResults from '../components/search/SearchResults';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    trending,
    searchResults,
    searchQuery,
    status,
    error
  } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (trending.length === 0) {
      dispatch(fetchTrending());
    }
  }, [dispatch, trending.length]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      dispatch(setSearchQuery(query));
      dispatch(clearSearchResults());
      dispatch(searchMoviesAsync(query));
    }
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
    dispatch(clearSearchResults());
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <SearchBar 
          onSearch={handleSearch} 
          onClear={handleClearSearch}
          initialQuery={searchQuery}
        />
      </Box>

      {status === 'loading' && searchResults.length === 0 && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      {searchQuery ? (
        <>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Search Results for "{searchQuery}"
          </Typography>
          <SearchResults />
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Trending This Week
          </Typography>
          <TrendingMovies />
        </>
      )}
    </Container>
  );
};

export default HomePage;