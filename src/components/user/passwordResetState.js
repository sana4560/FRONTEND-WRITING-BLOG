// ResetPasswordContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const ResetPasswordContext = createContext();

// Create a custom hook to use the context
export const useResetPassword = () => {
  return useContext(ResetPasswordContext);
};

// Create the provider component
export const ResetPasswordProvider = ({ children }) => {
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const openResetPassword = () => setIsResetPasswordOpen(true);
  const closeResetPassword = () => setIsResetPasswordOpen(false);

  return (
    <ResetPasswordContext.Provider
      value={{
        isResetPasswordOpen,
        openResetPassword,
        closeResetPassword,
      }}
    >
      {children}
    </ResetPasswordContext.Provider>
  );
};
