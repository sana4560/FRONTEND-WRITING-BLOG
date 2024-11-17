import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useSnackbar } from '../components/snackbar'; // Import the snackbar hook

export default function SignUp({ open, handleSignInOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showSuccessSnackbar,showWarningSnackbar } = useSnackbar(); // Use the snackbar hook here

  // Validation functions
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Validate email with gmail.com domain
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\W).{8,}$/; // At least 8 characters, 1 alphabet, 1 special character
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    // Reset form fields when the modal is opened
    if (open) {
      setEmail('');
      setUserName('');
      setPassword('');
    }
  }, [open]); // Dependency on `open` prop

  useEffect(() => {
    const postData = async () => {
      if (!isEmailValid(email)) {
        showWarningSnackbar('Please enter a valid email (e.g., email@gmail.com)');
        setSubmitted(false);
        return;
      }

      if (!isPasswordValid(password)) {
        showWarningSnackbar('Password must be at least 8 characters long and contain 1 alphabet and 1 special character.');
        setSubmitted(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password }),
        });

        if (!response.ok) {
          console.log('Error submitting signup details');
          showWarningSnackbar('Error submitting signup details');
          return;
        }

        const data = await response.json();
        console.log('Successfully submitted signup details', data);
        showSuccessSnackbar('Sign up successful!'); // Show success message

      } catch (errors) {
        console.error('Error submitting details', errors);
        showWarningSnackbar('Failed to sign up'); // Show error message
      } finally {
        setSubmitted(false);
        setEmail('');
        setUserName('');
        setPassword('');
      }
    };

    if (submitted) {
      postData();
    }
  }, [submitted, email, username, password, showSuccessSnackbar,showWarningSnackbar]); // Only dependencies related to submission

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: {
          width: '400px',
          height: '450px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <DialogTitle sx={{ margin: '0px', textAlign: 'center', height: '40px',}}>
        Sign Up
      </DialogTitle>
      <DialogContent sx={{margin: '10px', paddingTop: '20px',}}>
      
        <TextField
          id="signup-email"
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ marginTop: '5px', marginBottom: '5px'}}
        />
        <TextField
          id="username"
          label="User Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginTop: '5px', marginBottom: '5px' }}
        />
        <TextField
          id="signup-password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{marginTop: '5px', marginBottom: '5px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </DialogActions>

      <Typography variant="body2" sx={{ textAlign: 'center', margin: '16px' }}>
        Do you have an account? <Button onClick={handleSignInOpen}>Sign In</Button>
      </Typography>
    </Dialog>
  );
}
