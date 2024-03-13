import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControlLabel, Checkbox, FormLabel, Box } from '@mui/material';


function ViewScore() {
    const navigate = useNavigate();
    const location = useLocation();
    const { score } = location.state || {};

    const handleBackButton = () => {
        navigate(-1);
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>

            <div>
                <p>Paciente: {score.patientName}</p>
            </div>

            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={score.score.fibrillation}
                        disabled
                        name="fibrillation"
                        />
                    }
                    label="Flutter/Atrial fibrillation"
                />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.age}
                    disabled
                    name="age"
                    />
                }
                label="Age >= 75"
            />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.strokeScale}
                    disabled
                    name="strokeScale"
                    />
                }
                label="Stroke Scale NIHSS >= 12"
                />
            </div>

            <FormLabel disabled component="legend">Transformation Hemorrhage:</FormLabel>
            {score.score.tHemorrhage === 'none' && (
                <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.tHemorrhage}
                    disabled
                    name="tHemorrhage"
                    />
                }
                label="None"
                />
            )}
            {score.score.tHemorrhage === 'petequial' && (
                <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.tHemorrhage}
                    disabled
                    name="tHemorrhage"
                    />
                }
                label="petequial"
                />
            )}
            {score.score.tHemorrhage === 'hematoma' && (
                <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.tHemorrhage}
                    disabled
                    name="tHemorrhage"
                    />
                }
                label="hematoma"
                />
            )}

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.glucose}
                    disabled
                    name="glucose"
                    />
                }
                label="Glucose >= 140"
            />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.aspects}
                    disabled
                    name="aspects"
                    />
                }
                label="ASPECTS  <= 7"
            />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.injury}
                    disabled
                    name="injury"
                    />
                }
                label="Injury (injúria renal)"
            />
            </div>

            <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={score.score.nasoenteral}
                    disabled
                    name="nasoenteral"
                    />
                }
                label="Nasoenteral sonda"
            />
            </div>
    
            <Button sx={{marginTop: '15px', width: '100%'}} variant="contained" onClick={handleBackButton}>
                Voltar
            </Button>
        </Box>
      );

}

export default ViewScore;
