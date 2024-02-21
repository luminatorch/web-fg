import { fetchScores } from '../operations/firebaseOperations';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ScoreCard from '../display/ScoreCard';
import { useNavigate, useLocation } from 'react-router-dom';


const ListScores = () => {
  const [scores, setScores] = useState([]);
  const location = useLocation();
  const { userId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const loadScores = async () => {
      const fetchedScores = await fetchScores(userId);
      setScores(fetchedScores);
    };
    loadScores();
  }, []);

  const handleViewOptions = (scores) => {
    // Logic to view options
    navigate('/score-details', {state: {score: scores}});
  };

  const handleUpdateScore = (scores) => {
    // Logic to update score, potentially navigate to DisplayOptions with score data
  };

  const handleDeleteScore = (scores) => {
    // Logic to delete score
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
    </Grid>
  );
};

export default ListScores;
