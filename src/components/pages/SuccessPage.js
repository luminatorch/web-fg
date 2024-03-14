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
        //'& .MuiTextField-root': { m: 1, width: '25ch' }, // Adjust field sizes
        //'& .MuiButton-root': { m: 1, width: '25ch' }, // Adjust button sizes
      }}>
        <h1>Score adicionado!</h1>
        <p>Nome do paciente: {patientName}</p>
        <p>Score total: {totalScore}</p>
        <Button sx={{marginTop: '15px', width: '100%'}} variant="contained" onClick={() => navigate('/main-menu')}>Voltar para menu principal</Button>
      </Box> 
  );
}



export default SuccessPage;
