import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '25ch' }, // Adjust field sizes
        '& .MuiButton-root': { m: 1, width: '25ch' }, // Adjust button sizes
      }}
    >
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <Button type="submit" variant="contained">Login</Button>

      <Button
        onClick={() => navigate('/new-user')} // Navigate to NewUser component for sign-up
        fullWidth
        variant="outlined"
        sx={{ mt: 1, mb: 2 }}
      >
        Sign Up
      </Button>
    
    </Box>
  );
}

export default Login;
