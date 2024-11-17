import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Typography, Card } from '@mui/material';
import { useResetPassword } from '../components/user/passwordResetState';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const { isResetPasswordOpen, closeResetPassword } = useResetPassword();
  const navigate = useNavigate();

  const otpRefs = useRef([]); // Store references for OTP input fields

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^[a-zA-Z0-9]$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (index < otp.length - 1 && value) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otp.join('') }),
      });

      if (!response.ok) {
        setError('Failed to verify OTP. Please try again.');
        return;
      }

      const data = await response.json();
      if (data) {
        setOtpVerified(true);
        setTimer(0);
        console.log('OTP Verified Successfully');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while verifying OTP. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        setError('Failed to reset password. Please try again.');
        return;
      }

      const data = await response.json();
      if (data.success) {
        alert('Password reset successful');
        navigate('/home'); // Navigate back to home after successful reset
      } else {
        setError(data.message || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (timer === 0) {
      closeResetPassword(); // Close the reset password page when timer reaches 0
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  if (!isResetPasswordOpen) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Card
        style={{
          width: '400px',
          height: otpVerified ? '500px' : '450px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Reset Your Password
        </Typography>

        {!otpVerified && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-input-${index}`}
                variant="outlined"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                inputProps={{ maxLength: 1 }}
                style={{ width: '50px' }}
                sx={{ textAlign: 'center' }}
                inputRef={(el) => (otpRefs.current[index] = el)}
              />
            ))}
          </div>
        )}

        {!otpVerified && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyOtp}
            fullWidth
            disabled={timer === 0}
          >
            Verify OTP
          </Button>
        )}

        {otpVerified && (
          <>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              sx={{ marginBottom: '16px' }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              fullWidth
              sx={{ marginBottom: '16px' }}
            />
          </>
        )}

        {!otpVerified && (
          <Typography variant="body2" sx={{ textAlign: 'center', marginBottom: '16px' }}>
            Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </Typography>
        )}

        {error && <Typography sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>}

        {otpVerified && (
          <Button variant="contained" color="primary" onClick={handleResetPassword} fullWidth>
            Reset Password
          </Button>
        )}
      </Card>
    </div>
  );
}
