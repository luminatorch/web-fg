import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Menu, MenuItem } from '@mui/material';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertIcon from '@mui/material/Icon';

const ScoreCard = ({ score }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h5">Patient Name: {score.patientName}</Typography>
          <Typography variant="body1">Total Score: {score.totalScore}</Typography>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
        </CardContent>
      </Card>
    );
  };

export default ScoreCard;