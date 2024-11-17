import React from 'react';
import { Card, Menu, MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../components/snackbar';
import { useUsername } from '../components/user';
export default function ProfileMenu({ anchorEl, open, onClose }) {
  const { usernameAccess, Logout } = useUsername(); 
  const { showSuccessSnackbar,showWarningSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
    onClose(); // Close the menu after navigating
  };

  const handleLogout = () => {
    Logout();
    onClose(); // Close the menu after logout
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      id="account-menu"
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem>
        <Avatar /> {usernameAccess || 'Guest'}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleNavigateToDashboard}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}
