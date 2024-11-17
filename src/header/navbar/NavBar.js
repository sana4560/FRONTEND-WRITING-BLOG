import React, { useState } from 'react';
import { List, ListItem, Button, IconButton, Menu, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';
import ProfileMenu from '../../profile/ProfileMenu';
import useMediaQuery from '../../utils/useMediaQuery';
import { useModalContext } from '../../components/modal';
import './styles.css';

export default function NavBar() {

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { signInOpen, signUpOpen, handleSignInOpen, handleSignUpOpen,handleSignUpClose,handleClose, closeModals } = useModalContext();


  const isMobile = useMediaQuery(768); // Define mobile screen threshold here

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };



  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav style={{ height: '10vh',  }}>
        {!isMobile ? (
          <List
            className='nav-list'
            sx={{
              display: 'flex',
              gap: '20px',
              padding: '0 50px',
              listStyle: 'none',
          
            }}
          >
            <ListItem sx={{display:'flex',justifyContent:'flex-start'}}>
              <h2 style={{ fontStyle: 'italic' }}>Writings</h2>
            </ListItem>
            <ListItem>
              <Button href="/home" variant="text" sx={buttonStyle}>
                Home
              </Button>
            </ListItem>
            <ListItem>
              <Button href="/blogs" variant="text" sx={buttonStyle}>
                Blogs
              </Button>
            </ListItem>
            <ListItem>
              <Button href="/post" variant="text" sx={buttonStyle}>
                Post
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={handleSignInOpen} variant="text" sx={buttonStyle}>
                Sign In
              </Button>
              <SignIn open={signInOpen} onClose={handleClose} handleSignUpOpen={handleSignUpOpen} />
              <SignUp open={signUpOpen} onClose={handleSignUpClose} handleSignInOpen={handleSignInOpen} />
            </ListItem>
            <ListItem>
              <IconButton
                sx={iconButtonStyle}
                onClick={handleProfileMenuClick}
              >
                <PersonIcon />
              </IconButton>
              <ProfileMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose} />
            </ListItem>
          </List>
        ) : (
          <IconButton onClick={toggleMenu} sx={{ color: 'black' }}>
            <MenuIcon />
          </IconButton>
        )}
      </nav>

      {/* Drawer for mobile menu */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu} >
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop:'40px',
            padding: '20px',
            width: '150px',
          }}
        >
          <ListItem>
            <Button href="/home" variant="text" sx={buttonStyle} onClick={toggleMenu}>
              Home
            </Button>
          </ListItem>
          <ListItem>
            <Button href="/blogs" variant="text" sx={buttonStyle} onClick={toggleMenu}>
              Blogs
            </Button>
          </ListItem>
          <ListItem>
            <Button href="/post" variant="text" sx={buttonStyle} onClick={toggleMenu}>
              Post
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={handleSignInOpen} sx={buttonStyle} variant="text">
              Sign In
            </Button>
            <SignIn open={signInOpen} onClose={handleClose} handleSignUpOpen={handleSignUpOpen} />
            <SignUp open={signUpOpen} onClose={handleSignUpClose} handleSignInOpen={handleSignInOpen} />
          </ListItem>
          <ListItem>
            <IconButton
              sx={iconButtonStyle}
              onClick={handleProfileMenuClick}
            >
              <PersonIcon />
            </IconButton>
            <ProfileMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

const buttonStyle = {
  position: 'relative',
  color: 'black',
  textTransform: 'none',
  '&:after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    bottom: '-4px',
    width: '0%',
    height: '2px',
    backgroundColor: 'orange',
    transition: 'width 0.3s ease, left 0.3s ease',
  },
  '&:hover:after': {
    width: '100%',
    left: '0%',
  },
};

const iconButtonStyle = {
  color: 'orange',
  borderRadius: '50%',
  padding: '5px',
  backgroundColor: 'rgba(255, 165, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
  },
};
