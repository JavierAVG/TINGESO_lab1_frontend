import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // assuming you're using react-router for navigation

function Navbar() {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  const handleHomeClick = () => {
    navigate('/');
  }

  const handleClientClick = () => {
    navigate('/client/list');
  };

  const handleLoanClick = () => {
    navigate('/loan/list');
  };

  return (
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleHomeClick}>
            <Typography variant="h5">HOME</Typography>
          </Button>
          <Button color="inherit" onClick={handleClientClick}>
            <Typography variant="h6">Clients</Typography>
          </Button>
          <Button color="inherit" onClick={handleLoanClick}>
            <Typography variant="h6">Loans</Typography>
          </Button>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;
