import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" href="https://movie-explorer.com/">
          Movie Explorer
        </Link>{' '}
        {new Date().getFullYear()}
        {'. Built with '}
        <Link color="inherit" href="https://reactjs.org/">
          React
        </Link>{' '}
        and{' '}
        <Link color="inherit" href="https://mui.com/">
          Material UI
        </Link>
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;