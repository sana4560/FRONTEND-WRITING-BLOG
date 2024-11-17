import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Listing from './BlogsCollection/Listing'; // Import the Listing component
import Post from '../Post'; // Import the Post component
import { useUsername } from '../components/user';

export default function UserDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('blogs');
  const {usernameAccess}=useUsername ();

  const toggleMenu = () => {
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);
  };

  const handleChange = (page) => {
    setSelectedPage(page);
    setIsDrawerOpen(false); // Close drawer when a page is selected
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflowY: 'auto' }}>
      <AppBar position="static"  sx={{ backgroundColor: 'grey' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            welcome {usernameAccess}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={toggleMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
           
          },
        }}
      >
        <List sx={{display:'flex', flexDirection:'column',gap:'30px', paddingTop:'80px'}}>
          <ListItem button onClick={() => handleChange('blogs')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Blogs Collection" />
          </ListItem>
          <ListItem button onClick={() => handleChange('post')}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Post" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ padding: 3 }}>
        {selectedPage === 'blogs' ? (
          <Listing /> // Render the Listing component when 'blogs' is selected
        ) : (
          <Post /> // Render the Post component when 'post' is selected
        )}
      </Box>
    </Box>
  );
}
