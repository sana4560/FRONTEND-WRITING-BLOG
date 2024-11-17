import React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; // Import Box for layout
import { usePostCount } from './index';

export default function CustomizedPagination({ currentPage, onPageChange }) {
  const { postCount } = usePostCount();

  // Calculate the total number of pages based on the post count and posts per page
  const postsPerPage = 25; // Adjust this to your desired number of posts per page
  const totalPages = Math.ceil(postCount / postsPerPage); // Total pages

  // Handle page change
  const handleChange = (event, value) => {
    onPageChange(value); // Call the function passed as a prop to update the current page
  };

  return (
    <Box 
      display="flex" 
      
      justifyContent="center" 
      alignItems="center" 
      sx={{ marginTop: '16px' }} // Optional margin for spacing
    >
      <Typography>
        Page: {currentPage} of {totalPages}
      </Typography>
      <Pagination
        count={totalPages} // Total number of pages
        page={currentPage} // Current active page
        onChange={handleChange} // Function to call on page change
        variant="outlined" // Optional styling
        shape="rounded" // Optional styling
      />
    </Box>
  );
}
