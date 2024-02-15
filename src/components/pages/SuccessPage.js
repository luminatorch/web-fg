import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

function SuccessPage() {
  const location = useLocation();
  const { patientName, totalScore } = location.state || {};
  const navigate = useNavigate();

  return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '25ch' }, // Adjust field sizes
        '& .MuiButton-root': { m: 1, width: '25ch' }, // Adjust button sizes
      }}>
        <h1>Score Added Successfully!</h1>
        <p>Patient Name: {patientName}</p>
        <p>Total Score: {totalScore}</p>
        <Button variant="contained" onClick={() => navigate('/main-menu')}>Go Back to Main Menu</Button>
      </Box> 
  );
}



export default SuccessPage;
