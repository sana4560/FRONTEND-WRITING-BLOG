import React from 'react';
import { Card, Button, Box } from '@mui/material';
import SearchBar from '../components/searchbar/SearchBar';
import TypingText from '../components/animation/TypingText';
import RecentPosts from '../Post/RecentPosts';
import Footer from '../footer';
import webbackground from '../assets/webbackground.png';
import useMediaQuery from '../utils/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { useModalContext } from '../components/modal';
import BubbleAnimation from '../components/animation/BubbleAnimation';

export default function HomePage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const cardWidth = isMobile ? '90vw' : isTablet ? '75vw' : '100vw';
  const cardHeight = isMobile ? '300px' : '400px';

  const { signInOpen, signUpOpen, handleSignInOpen, handleSignUpOpen, closeModals } = useModalContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
        backgroundImage: `url(${webbackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
      
     
      }}
    >
      <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Card
  sx={{
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    position: 'relative', // Add this line
  }}
>

         <BubbleAnimation/>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' ,padding:'10px' }}>
            <SearchBar />
            <TypingText />
            <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <Button
                variant="contained"
                onClick={handleSignInOpen}
                sx={{ backgroundColor: 'orange', color: 'white' }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={handleSignUpOpen}
                sx={{ backgroundColor: 'grey', color: 'white' }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Recent Posts Section */}
        <Box sx={{ width: '100%', padding: '10px', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <RecentPosts />
          <Button
  href="/blogs"
  disableRipple
  sx={{
    marginLeft: '10px',
    color: 'blue',
    width: '100px',
    alignItems: 'flex-end',
    '&:hover': {
      backgroundColor: 'transparent', // Remove hover background
      color: 'blue', // Maintain original color on hover
    },
    '&:active': {
      backgroundColor: 'transparent', // Remove active background
      color: 'blue', // Maintain original color on click
    },
  }}
>
  ...more
</Button>
        </Box>
    
      </Box>
       <div>
       <Footer />
       </div>
   
   
      <SignIn open={signInOpen} onClose={closeModals} handleSignUpOpen={handleSignUpOpen} />
      <SignUp open={signUpOpen} onClose={closeModals} handleSignInOpen={handleSignInOpen} />
  
    </Box>
  );
}
