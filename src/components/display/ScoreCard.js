import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/material/Icon';

const ScoreCard = ({ score, onViewOptions, onUpdateScore, onDeleteScore }) => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h5">Paciente: {score.patientName}</Typography>
          <Typography variant="body1">Score total: {score.totalScore}</Typography>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}>
              <Typography variant="subtitle2" component="span">
                <MoreVertIcon fontSize='small' />Mais opções
              </Typography>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => { onViewOptions(score); handleClose(); }}>Detalhes</MenuItem>
          <MenuItem onClick={() => { onUpdateScore(score); handleClose(); }}>Atualizar Score</MenuItem>
          <MenuItem onClick={() => { onDeleteScore(score); handleClose(); }}>Deletar Score</MenuItem>
        </Menu>
        </CardContent>
      </Card>
    );
  };

export default ScoreCard;