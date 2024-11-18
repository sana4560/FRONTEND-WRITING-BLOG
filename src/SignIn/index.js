import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "../components/snackbar";
import { useUsername } from "../components/user";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../components/user/passwordResetState";
export default function SignIn({ open, onClose, handleSignUpOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const { openResetPassword } = useResetPassword();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { showSuccessSnackbar, showWarningSnackbar } = useSnackbar();
  const { showUsername, showUserId } = useUsername();

  const handleForgetPassword = () => {
    if (!email) {
      showWarningSnackbar("Please enter your email address");
      return;
    }
    setForgetPassword(true);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };
  useEffect(() => {
    // Reset form fields when the modal is opened
    if (open) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [open]);
  // Handle Sign In
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/users/signin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
        console.log(
          "API URL:",
          `${process.env.REACT_APP_BASE_URL}/users/signin`
        );

        const data = await response.json();
        if (!response.ok) {
          setError(data.message);
          showWarningSnackbar("Error signing in");
          return;
        }

        const { token } = data;
        if (token) {
          localStorage.setItem("token", token);
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const username = decodedToken.username;
          const userId = decodedToken.id;

          showUsername(username);
          showUserId(userId);
          showSuccessSnackbar(`Sign In successful! Welcome, ${username}!`);
        }
      } catch (error) {
        console.error("Error submitting details", error);
      } finally {
        setSubmitted(false);
        setEmail("");
        setPassword("");
      }
    };

    if (submitted) {
      postData();
    }
  }, [
    submitted,
    email,
    password,
    showSuccessSnackbar,
    showWarningSnackbar,
    showUsername,
    showUserId,
  ]);

  // Handle Forget Password
  useEffect(() => {
    if (forgetPassword && email) {
      const generateMail = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/users/forget-password`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            }
          );

          const data = await response.json();
          if (response.ok) {
            console.log("respone is ok", data);
            showSuccessSnackbar("Password reset link sent to your email");
            openResetPassword();
            navigate("/reset-password");
          } else {
            setError(data.message || "Failed to send reset email");
            showWarningSnackbar("Failed to send reset email");
          }
        } catch (error) {
          setError("Error sending reset email");
          showWarningSnackbar("Error sending reset email");
        } finally {
          setForgetPassword(false);
          setEmail("");
        }
      };

      generateMail();
    }
  }, [forgetPassword, email, showSuccessSnackbar, showWarningSnackbar]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {
            width: "400px",
            height: "450px",
            borderRadius: "10px", // Rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
          },
        }}
      >
        <DialogTitle
          sx={{
            margin: "0px",
            textAlign: "center",
            height: "40px",
            background: "primary.main",
          }}
        >
          Sign In
        </DialogTitle>

        <DialogContent sx={{ padding: "20px" }}>
          {error && (
            <Typography sx={{ color: "red", textAlign: "center" }}>
              {error}
            </Typography>
          )}
          {/* User Name Input */}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ marginTop: "5px", marginBottom: "5px" }}
          />

          {/* Password Input */}
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ marginTop: "5px", marginBottom: "5px" }}
          />
        </DialogContent>

        {/* Actions for the modal (Sign In button and Close button) */}
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Sign In
          </Button>
        </DialogActions>

        {/* Sign Up Link */}
        <Typography
          variant="body2"
          sx={{ textAlign: "center", margin: "10px" }}
        >
          Don't have an account?{" "}
          <Button onClick={handleSignUpOpen}>Sign Up</Button>
        </Typography>

        <Button
          onClick={handleForgetPassword}
          sx={{ display: "block", paddingBottom: "25px" }}
        >
          Forget Password
        </Button>

        {/* Display error if any */}
      </Dialog>
    </div>
  );
}
