import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { useSnackbar } from '../snackbar'; 
const UsernameContext = createContext();

export const  UsernameProvider=({ children })=> {
    const [usernameAccess, setUsernameAccess] = useState(() => {
        return localStorage.getItem('username') || ''; // Default to empty string if not found
      });
      const [userId, setUserId] = useState(() => {
        return localStorage.getItem('userId') || ''; // Default to empty string if not found
      });
  const { showSuccessSnackbar } = useSnackbar();

  const showUserId=(userId)=>{
    setUserId(userId);
    localStorage.setItem('userId', userId);

  }

  const showUsername = (username) => {
    setUsernameAccess(username);
    localStorage.setItem('username', username);
  
  };

  const Logout = () => {
    setUsernameAccess(null);
    setUserId(null); // Clear userId from context
    localStorage.removeItem('username'); // Optionally clear from localStorage
    localStorage.removeItem('userId'); // Clear userId from localStorage
    showSuccessSnackbar('Successfully logged out'); // Show message
};
  return (
    <UsernameContext.Provider value={{ showUsername, usernameAccess ,Logout, userId,showUserId }}>
      {children}
    </UsernameContext.Provider>
  );
}
export const useUsername = () => useContext(UsernameContext);
