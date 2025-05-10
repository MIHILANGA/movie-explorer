import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from './ThemeToggle';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';

interface AppBarProps {
  onDrawerToggle: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onDrawerToggle }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Movie Explorer
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;