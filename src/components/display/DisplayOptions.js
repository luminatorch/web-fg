import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControlLabel, Checkbox, Radio, RadioGroup, FormLabel, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { newScore } from '../operations/firebaseOperations';
import { Score } from '../models/models';

// Define options and suboptions directly in the component
// const options = [
//   { label: 'Flutter/Atrial fibrillation? (1 pt)', value: 'F', score: 1 },
//   { label: 'Age >= 75? (1 pt)', value: 'A', score: 1 },
//   { label: 'Stroke Scale NIHSS >= 12? (2 pts)', value: 'S', score: 2 },
//   { label: 'Glucose >= 140? (1 pt)', value: 'G', score: 1 },
//   { label: 'ASPECTS =<7? (2 pts)', value: 'AS', score: 2 },
//   { label: 'Injury (injúria renal)? (1 pt)', value: 'I', score: 1 },
//   { label: 'Nasoenteral sonda? (1 pt)', value: 'N', score: 1 },
// ];

// const subOptions = [
//   { label: 'None', value: 'none', score: 0 },
//   { label: 'Petequial (1 pt)', value: 'petequial', score: 1 },
//   { label: 'Hematoma (2 pts)', value: 'hematoma', score: 2 },
// ];

function DisplayOptions() {
    const [patientName, setPatientName] = useState('');
    //const [score, setScore] = useState(new Score());
    //const [selectedOptions, setSelectedOptions] = useState([]);
    //const [selectedSubOption, setSelectedSubOption] = useState('none');
    const [scores, setScores] = useState({
        fibrillation: false,
        age: false,
        strokeScale: false,
        tHemorrhage: 'none', // Assuming 'none', 'petequial', 'hematoma' as values
        glucose: false,
        aspects: false,
        injury: false,
        nasoenteral: false
    });
    //const [totalScore, setTotalScore] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);



    const optionLabels = {
        fibrillation: 'Flutter/Atrial Fibrillation? (1 pt)',
        age: 'Age >= 75? (1 pt)',
        strokeScale: 'Stroke Scale NIHSS >= 12? (2 pts)',
        tHemorrhage: 'Transformation Hemorrhage',
        glucose: 'Glucose >= 140? (1 pt)',
        aspects: 'ASPECTS =<7? (2 pts)',
        injury: 'Injury (injúria renal)? (1 pt)',
        nasoenteral: 'Nasoenteral Sonda? (1 pt)',
    };
  

    function getOptionLabel(optionKey) {
        // Returns the label for the given option key, or the key itself if not found
        return optionLabels[optionKey] || optionKey;
    }
  


    const navigate = useNavigate();

    const handleOptionChange = (option, value) => {
        setScores(prevScores => ({
        ...prevScores,
        [option]: value
        }));
        // const updatedScore = new Score(score);
        // updatedScore.updateOption(option, value);
        // setScore(updatedScore);
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
        const calculatedTotalScore = Object.keys(scores).reduce((acc, key) => {
            const value = scores[key];
            if (typeof value === 'boolean' && value) {
                if (key === 'strokeScale' || key === 'aspects') {
                    return acc + 2; // strokeScale and aspects are worth 2 points each
                } else {
                    return acc + 1;
                }
            }
            return acc;
        }, 0) + (scores.tHemorrhage === 'petequial' ? 1 : scores.tHemorrhage === 'hematoma' ? 2 : 0);
    
        try {

            await newScore(patientName, scores, calculatedTotalScore);
        
        navigate('/success', { state: { patientName, calculatedTotalScore } });
        } catch (error) {
        console.error("Could not add the document: ", error);
        }
    };
  
  

    return (
        <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
            <form onSubmit={handleSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& .MuiTextField-root': { m: 1, width: '25ch' }, // Adjust field sizes
                    '& .MuiButton-root': { m: 1, width: '25ch' }, // Adjust button sizes
      }} >
            <TextField
                label="Patient's Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
            />

            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={scores.fibrillation}
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
                    checked={scores.age}
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
                    checked={scores.strokeScale}
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
                value={scores.tHemorrhage}
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
                    checked={scores.glucose}
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
                    checked={scores.aspects}
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
                    checked={scores.injury}
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
                    checked={scores.nasoenteral}
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
        </Box>
      );

}

export default DisplayOptions;
