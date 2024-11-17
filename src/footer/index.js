import React from 'react';
import { Card, Typography, Box } from '@mui/material';

export default function Footer() {
  return (
    <Card
      sx={{
     
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column', // Stack content vertically
        flexWrap: 'wrap', // Wraps content when necessary
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ padding: '20px', flexWrap:'wrap'}}>
        <Typography variant="body1" gutterBottom >
          This website is created to interact with intellectual individuals, where thoughts hold the power to inspire change. 
          Our creative minds thrive on imagination, and by sharing your words and stories here, you open yourself to learning, 
          thoughtful responses, and encouragement from a like-minded community.
        </Typography>
      </Box>
      <Typography variant="h6" style={{ fontWeight: '500', fontStyle: 'italic',paddingBottom: '20px' }}>
        "You are the captain of your soul and the master of your fate. Choose health, choose happiness."
      </Typography>
    </Card>
  );
}
