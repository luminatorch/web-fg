import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getAuth, signOut } from 'firebase/auth';


function MainMenu() {
  const navigate = useNavigate();
  const auth = getAuth();


  const handleAddScore = () => {
    // Navigate to the Add Score page/component
    navigate('/add-score');
  };

  const handleListScores = () => {
    // Navigate to the List Scores page/component
    navigate('/list-scores', { state: { userId: auth.currentUser.uid }});
  };

  const handleSignOut = () => {
    signOut(auth);
    navigate('/');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Menu Principal
      </Typography>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="contained" color="primary" onClick={handleAddScore}>
          Adicionar Score
        </Button>
        <Button variant="contained" color="primary" onClick={handleListScores}>
          Listar Scores
        </Button>
        <Button variant="contained" color="primary" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}

export default MainMenu;
