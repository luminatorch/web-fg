import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/fastgain_logo_F.jpeg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const auth = getAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login (e.g., navigate to a dashboard page)
      navigate('/main-menu');
    } catch (error) {
      setError('Failed to log in');
      console.error(error.message);
    }
  };

  return (
        <Box component="form" 
          onSubmit={handleLogin} 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '50vh',
            marginTop: '150px',
            flexDirection: 'column',
            alignItems: 'center'
            //'& .MuiTextField-root': { m: 1, width: '25ch' }, 
            //'& .MuiButton-root': { m: 1, width: '25ch' }, 
          }}
          
        >
          <img src={logo} alt="Logo" style={{maxWidth: '100%', maxHeight: '100%'}}/>
          <Grid container spacing={2} alignItems={'center'} direction={'column'}>
            <Grid item marginTop={'10px'}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>

            <Grid item >
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>

            {error && <p>{error}</p>}
            <Grid item width='30%'>
              <Button type="submit" variant="contained" fullWidth>Login</Button>
            </Grid>

            <Grid item width='30%'>
              <Button
                onClick={() => navigate('/new-user')}
                fullWidth
                variant="outlined"
                color='secondary'
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up
              </Button>
            </Grid>

          </Grid>
        
        </Box>
  );
}

export default Login;
