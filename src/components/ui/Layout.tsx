import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Footer from './Footer';
import { useAppSelector } from '../../app/hooks';

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {isAuthenticated && (
        <>
          <AppBar onDrawerToggle={handleDrawerToggle} />
          <Drawer open={mobileOpen} onClose={handleDrawerToggle} />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isAuthenticated ? 240 : 0}px)` },
          ml: { sm: `${isAuthenticated ? 240 : 0}px` },
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;