import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { checkAuth } from '../features/auth/authThunks';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, status, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return {
    isAuthenticated,
    user,
    isLoading: status === 'loading',
    error,
  };
};

export default useAuth;