import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/ui/Layout';
import PrivateRoute from './components/auth/PrivateRoute';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout></Layout>
          <Router>
            
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/favorites" 
                  element={
                    
                      <FavoritesPage />
                    
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;