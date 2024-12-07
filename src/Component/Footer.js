import React, { useState } from 'react';
import { Grid, Typography, Link, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import AddUser from './AddUser';

const Footer = () => {
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  // Contact Us Modal handlers
  const handleOpenContactModal = () => setOpenContactModal(true);
  const handleCloseContactModal = () => setOpenContactModal(false);

  // Register Modal handlers
  const handleOpenRegisterModal = () => setOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setOpenRegisterModal(false);

  return (
    <Box sx={{ backgroundColor: '#420e07', color: 'white', padding: '30px 20px' }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Column 1: Library Info */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            About Our Library
          </Typography>
          <Typography variant="body2" paragraph>
            Our library provides access to a wide range of books, e-books, and journals to promote learning and reading. Join us today and explore our extensive collection!
          </Typography>
        </Grid>

        {/* Column 2: Quick Links */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link href="/" color="inherit" underline="hover" sx={{ marginRight: '15px' }}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/login" color="inherit" underline="hover" sx={{ marginRight: '15px' }}>
                Login
              </Link>
            </li>
            <li>
              <Link href="#" onClick={handleOpenRegisterModal} color="inherit" underline="hover" sx={{ marginRight: '15px' }}>
                Register
              </Link>
            </li>
            <li>
              <Link href="#" onClick={handleOpenContactModal} color="inherit" underline="hover" sx={{ marginRight: '15px' }}>
                Contact Us
              </Link>
            </li>
          </ul>
        </Grid>

        {/* Column 3: Social Media Links */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Connect with Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton color="inherit" href="https://facebook.com" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com" target="_blank">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="https://linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Online Library Management System. All Rights Reserved.
        </Typography>
      </Box>

      {/* Modal for Contact Us */}
      <Dialog open={openContactModal} onClose={handleCloseContactModal}>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            If you have any questions, feel free to reach out to us through our contact form or email us at bookorchidinfo@library.com.
          </Typography>
          <Typography variant="body2">
            Phone: +91-6296168624 <br />
            Email: bookorchidinfo@library.com
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContactModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Register (AddUser Component) */}
      <Dialog open={openRegisterModal} onClose={handleCloseRegisterModal}>
        <DialogContent>
          <AddUser /> {/* Show AddUser component in the modal */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegisterModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Footer;
