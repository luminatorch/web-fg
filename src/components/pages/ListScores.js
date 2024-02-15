import { listScores } from '../operations/firebaseOperations';
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';
import ScoreCard from '../display/ScoreCard';

  

const ListScores = () => {
    const [scores, setScores] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
  
    useEffect(() => {
      if (user) {
        listScores(user.uid).then(setScores);
      }
    }, [user]);
  
    return (

      <Grid container spacing={2} direction='column'>
        {scores.map((score) => (
          <Grid item key={score.id} xs={12} sm={6} md={4}>
            {/* <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Paciente: {score.patientName}
                </Typography>
                Score: {score.totalScore} 
              </CardContent>
            </Card> */}
         <Grid item key={score.id} xs={12}>
           <ScoreCard score={score} />
         </Grid>
          </Grid>
        ))}
      </Grid>

    );
  };

// const ListScores = ({ scores }) => (
//     <Grid container spacing={2} direction="column">
//       {scores.map(score => (
//         <Grid item key={score.id} xs={12}>
//           <ScoreCard score={score} />
//         </Grid>
//       ))}
//     </Grid>
//   );
  

  
export default ListScores;
