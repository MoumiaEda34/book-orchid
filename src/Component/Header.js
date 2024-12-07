import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice'; // Import logout action
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './Header.css';
import bookOrchidLogo from '../assets/images/Book_Orchid.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // States for menu and drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Drawer toggle
  const toggleDrawer = (open) => (event) => setOpenDrawer(open);

  // Submenu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Menu items
  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Wishlist', to: '/wishlist' },
    { label: 'History', to: '/all-order-list' },
    {
      label: 'My Books',
      subItems: [
        { label: 'Trending', to: '/trending' },
        { label: 'Kids', to: '/kids' },
      ],
    },
    { label: 'Register', to: '/user/add' },
  ];

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="header-main">
      <AppBar position="static" sx={{ backgroundColor: '#420e07' }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="img" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={bookOrchidLogo}
              alt="Book Orchid"
              style={{ height: '80px', margin: '7px', width: '130px' }}
            />
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {menuItems.map((item) =>
              item.subItems ? (
                <Box key={item.label}>
                  <Button
                    color="inherit"
                    aria-controls="submenu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                  <Menu
                    id="submenu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    sx={{
                      '& .MuiMenu-paper': {
                        backgroundColor: '#f5f5f5',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    {item.subItems.map((subItem) => (
                      <MenuItem
                        key={subItem.label}
                        component={Link}
                        to={subItem.to}
                        onClick={handleMenuClose}
                        sx={{
                          color: '#420e07eb', // Set submenu item color
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        {subItem.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={item.label}
                  color={location.pathname === item.to ? 'secondary' : 'inherit'}
                  component={Link}
                  to={item.to}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              )
            )}
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/profile">
                  <IconButton color="inherit">
                    <AccountCircle />
                  </IconButton>
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>

          {/* Hamburger Icon for Mobile */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <List role="navigation">
          {menuItems.map((item) =>
            item.subItems ? (
              <React.Fragment key={item.label}>
                <ListItem>
                  <ListItemText primary={item.label} />
                </ListItem>
                {item.subItems.map((subItem) => (
                  <ListItem
                    button
                    key={subItem.label}
                    component={Link}
                    to={subItem.to}
                    onClick={toggleDrawer(false)}
                    sx={{ paddingLeft: 4, color: '#420e07eb' }} // Set submenu item color for mobile
                  >
                    <ListItemText primary={subItem.label} />
                  </ListItem>
                ))}
              </React.Fragment>
            ) : (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.to}
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
