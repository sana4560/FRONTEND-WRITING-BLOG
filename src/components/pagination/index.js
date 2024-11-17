import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Context
const PostCountContext = createContext();

// Create a provider component
export const PostCountProvider = ({ children }) => {
  const [postCount, setPostCount] = useState(() => {
    const savedCount = localStorage.getItem('postCount');
    // Check if savedCount is not null or empty string
    return savedCount && !isNaN(savedCount) ? parseInt(savedCount, 10) : 0;
  });

  // Effect to store postCount in localStorage
  useEffect(() => {
    localStorage.setItem('postCount', postCount);
  }, [postCount]);

  console.log('postcount', postCount);

  const incrementPostCount = () => setPostCount((prev) => prev + 1);
  const decrementPostCount = () => setPostCount((prev) => prev - 1);

  return (
    <PostCountContext.Provider value={{ postCount, incrementPostCount, decrementPostCount }}>
      {children}
    </PostCountContext.Provider>
  );
};

// Custom hook to use PostCountContext
export const usePostCount = () => {
  return useContext(PostCountContext);
};
