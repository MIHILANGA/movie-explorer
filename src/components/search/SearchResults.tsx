import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { searchMoviesAsync } from '../../features/movies/moviesSlice';
import MovieGrid from '../movies/MovieGrid';
import InfiniteScroll from '../ui/InfiniteScroll';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorAlert from '../ui/ErrorAlert';

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchResults, searchQuery, status, error, page, totalPages } = useAppSelector(
    (state) => state.movies
  );

  const loadMore = () => {
    if (page < totalPages) {
      dispatch(searchMoviesAsync(searchQuery));
    }
  };

  if (status === 'loading' && searchResults.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={page < totalPages}
      isLoading={status === 'loading'}
    >
      <MovieGrid movies={searchResults} />
    </InfiniteScroll>
  );
};

export default SearchResults;