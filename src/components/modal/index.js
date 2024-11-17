// ModalContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const ModalContext = createContext();

// Context provider component
export const ModalProvider = ({ children }) => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleSignInOpen = () => {
    setSignInOpen(true);
    setSignUpOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
    setSignInOpen(false);
  };

  const closeModals = () => {
    setSignInOpen(false);
    setSignUpOpen(false);
  };
  
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };



  const handleClose = () => {
    setSignInOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        signInOpen,
        signUpOpen,
       handleSignInOpen,
        handleSignUpOpen,
        closeModals,
        handleSignUpClose,
        handleClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the ModalContext
export const useModalContext = () => useContext(ModalContext);
