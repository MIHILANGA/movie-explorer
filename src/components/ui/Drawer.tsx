import React from 'react';
import { Drawer as MuiDrawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Favorite, Movie } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) return null;

  return (
    <MuiDrawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
      }}
    >
      <List>
        <ListItem button component={Link} to="/" onClick={onClose}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/favorites" onClick={onClose}>
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItem>
        <ListItem button component={Link} to="/" onClick={onClose}>
          <ListItemIcon>
            <Movie />
          </ListItemIcon>
          <ListItemText primary="Movies" />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;