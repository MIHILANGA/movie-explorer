import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, CircularProgress } from '@mui/material';

interface InfiniteScrollProps {
  children: React.ReactNode;
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ 
  children, 
  loadMore, 
  hasMore, 
  isLoading 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMore();
    }
  }, [inView, hasMore, isLoading, loadMore]);

  return (
    <div>
      {children}
      <div ref={ref} style={{ height: '20px' }} />
      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default InfiniteScroll;