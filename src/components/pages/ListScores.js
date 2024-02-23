import { deleteScore, fetchScores } from '../operations/firebaseOperations';
import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import ScoreCard from '../display/ScoreCard';
import { useNavigate, useLocation } from 'react-router-dom';


const ListScores = () => {
  const [scores, setScores] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const { userId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const loadScores = async () => {
      const fetchedScores = await fetchScores(userId);
      const validScores = fetchedScores.filter(score => score != null);
      setScores(validScores);
    };
    loadScores();
  }, [refresh]);

  const handleViewOptions = (scores) => {
    // Logic to view options
    navigate('/score-details', {state: {score: scores}});
  };

  const handleUpdateScore = (scores) => {
    // Logic to update score, potentially navigate to DisplayOptions with score data
    navigate('/update-score', {state: {receivedScore: scores}});
  };

  const handleDeleteScore = async (scores) => {
    // Logic to delete score
    await deleteScore(scores.id);
    setRefresh(prev => !prev);
  };

  return (
    <Grid container spacing={2}>
      {scores.map(scores => (
        <Grid item key={scores.id} xs={12}>
          <ScoreCard
            score={scores}
            onViewOptions={() => handleViewOptions(scores)}
            onUpdateScore={() => handleUpdateScore(scores)}
            onDeleteScore={() => handleDeleteScore(scores)}
          />
        </Grid>
      ))}
      <Button variant="contained" onClick={() => navigate(-1)}>Voltar</Button>
    </Grid>
  );
};

export default ListScores;
