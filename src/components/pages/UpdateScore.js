import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControlLabel, Checkbox, Radio, RadioGroup, FormLabel, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateScore } from '../operations/firebaseOperations';
import { Score } from '../models/models';


function UpdateScore() {

    const location = useLocation();
    const { receivedScore } = location.state || {};

    const [score, setScore] = useState(new Score(receivedScore.id, receivedScore.patientName,
            {   fibrillation: receivedScore.score.fibrillation, 
                age: receivedScore.score.age, 
                strokeScale: receivedScore.score.strokeScale, 
                tHemorrhage: receivedScore.score.tHemorrhage, 
                glucose: receivedScore.score.glucose, 
                aspects: receivedScore.score.aspects, 
                injury: receivedScore.score.injury, 
                nasoenteral: receivedScore.score.nasoenteral  }, receivedScore.createdAt, receivedScore.totalScore));
    const [openDialog, setOpenDialog] = useState(false);

  


    const navigate = useNavigate();

    const handleOptionChange = (option, value) => {
        const updatedScore = new Score(
            score.documentId, 
            score.patientName,{ 
                fibrillation: score.score.fibrillation,
                age: score.score.age,
                strokeScale: score.score.strokeScale,
                tHemorrhage: score.score.tHemorrhage,
                glucose: score.score.glucose,
                aspects: score.score.aspects,
                injury: score.score.injury,
                nasoenteral: score.score.nasoenteral,
            },
            score.createdAt,
            score.totalScore
            );
        updatedScore.updateOption(option, value);
        setScore(updatedScore);
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    
    const handleClose = () => {
        setOpenDialog(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Directly calculate total score right before submission
        const calculatedTotalScore = Object.keys(score.score).reduce((acc, key) => {
            const value = score.score[key];
            if (typeof value === 'boolean' && value) {
                if (key === 'strokeScale' || key === 'aspects') {
                    return acc + 2; // strokeScale and aspects are worth 2 points each
                } else {
                    return acc + 1;
                }
            }
            return acc;
        }, 0) + (score.score.tHemorrhage === 'petequial' ? 1 : score.score.tHemorrhage === 'hematoma' ? 2 : 0);
    
        try {

            await updateScore(score.documentId, {
                score: score.score,
                updatedAt: new Date(),
                totalScore: calculatedTotalScore
            });
        
            navigate('/success', { state: { patientName: score.patientName , totalScore: calculatedTotalScore } });
        } catch (error) {
        console.error("Could not add the document: ", error);
        }
    };
  
  

    return (
        <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>

            <div>
                <p>Paciente: {score.patientName}</p>
            </div>
            <form onSubmit={handleSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& .MuiTextField-root': { m: 1, width: '25ch' }, // Adjust field sizes
                    '& .MuiButton-root': { m: 1, width: '25ch' }, // Adjust button sizes
      }} >

            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={score.score.fibrillation}
                        onChange={(e) => handleOptionChange('fibrillation', e.target.checked)}
                        name="fibrillation"
                        />
                    }
                    label="Flutter/Atrial fibrillation? (1 pt)"
                />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.age}
                    onChange={(e) => handleOptionChange('age', e.target.checked)}
                    name="age"
                    />
                }
                label="Age >= 75? (1 pt)"
            />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.strokeScale}
                    onChange={(e) => handleOptionChange('strokeScale', e.target.checked)}
                    name="strokeScale"
                    />
                }
                label="Stroke Scale NIHSS >= 12? (2 pts)"
                />
            </div>

            <FormLabel component="legend">Transformation Hemorrhage</FormLabel>
            <RadioGroup
                name="tHemorrhage"
                value={score.score.tHemorrhage}
                onChange={(e) => handleOptionChange('tHemorrhage', e.target.value)}
            >
                <FormControlLabel value="none" control={<Radio />} label="None" />
                <FormControlLabel value="petequial" control={<Radio />} label="Petequial (1 pt)" />
                <FormControlLabel value="hematoma" control={<Radio />} label="Hematoma (2 pts)" />
            </RadioGroup>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.glucose}
                    onChange={(e) => handleOptionChange('glucose', e.target.checked)}
                    name="glucose"
                    />
                }
                label="Glucose >= 140? (1 pt)"
            />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.aspects}
                    onChange={(e) => handleOptionChange('aspects', e.target.checked)}
                    name="aspects"
                    />
                }
                label="ASPECTS  <= 7? (2 pts)"
            />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.injury}
                    onChange={(e) => handleOptionChange('injury', e.target.checked)}
                    name="injury"
                    />
                }
                label="Injury (injúria renal)? (1 pt)"
            />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.nasoenteral}
                    onChange={(e) => handleOptionChange('nasoenteral', e.target.checked)}
                    name="nasoenteral"
                    />
                }
                label="Nasoenteral sonda? (1 pt)"
            />
            </div>
    
            <Button variant="outlined" onClick={handleClickOpen}>
                Submit
            </Button>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                    {"Confirm Submission"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to submit the score?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} autoFocus>
                        Confirm
                    </Button>
                    
                    </DialogActions>
                </Dialog>
            </form>
            <Button sx={{ margin: 0}} variant="contained" onClick={() => navigate(-1)}>Voltar</Button>
        </Box>
      );

}

export default UpdateScore;
