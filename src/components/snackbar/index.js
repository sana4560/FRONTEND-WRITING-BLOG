// /snackbar/index.js
import React, { createContext, useState, useContext } from "react";
import SuccessSnackbar from "./SuccessSnackbar"; // Import the SuccessSnackbar component
import WarningSnackbar from "./WarningSnackbar";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success"); // Track snackbar type

  // Show success snackbar
  const showSuccessSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarType("success");
    setSnackbarOpen(true);
  };

  // Show warning snackbar
  const showWarningSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarType("warning");
    setSnackbarOpen(true);
  };

  // Close snackbar
  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <SnackbarContext.Provider
      value={{ showSuccessSnackbar, showWarningSnackbar, closeSnackbar }}
    >
      {/* Render the appropriate snackbar based on the type */}
      {snackbarType === "success" ? (
        <SuccessSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={closeSnackbar}
        />
      ) : (
        <WarningSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={closeSnackbar}
        />
      )}
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
