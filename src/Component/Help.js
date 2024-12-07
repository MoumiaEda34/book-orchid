import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Help = ({ isLoggedIn }) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom sx={styles.header}>
        Welcome to Book Orchid - Login Help
      </Typography>

      {!isLoggedIn ? (
        <div>
          <Typography variant="body1" sx={styles.text}>
            You are currently not logged in. Here's how to access the platform:
          </Typography>
          <ul>
            <li>Sign in using your email and password.</li>
            <li>If you don’t have an account, you can <strong>Register</strong> to get started.</li>
            <li>If you’ve forgotten your password, you can reset it through the <strong>Forgot Password</strong> option.</li>
          </ul>
          <Typography variant="body1" sx={styles.text}>
            Log in to access your profile and manage your orders.
          </Typography>
        </div>
      ) : (
        <div>
          <Typography variant="body1" sx={styles.text}>
            Enjoy exploring Book Orchid! You're already logged in.
          </Typography>
          <Button variant="contained" sx={styles.button} component={Link} to="/">
            Go to Home
          </Button>
        </div>
      )}

      <Typography variant="body2" color="textSecondary" sx={styles.text}>
        Don't have an account? <Link to="/register" style={{ fontWeight: 'bold', color: '#3f51b5' }}>Register here</Link>.
      </Typography>

      <Typography variant="body2" color="primary" sx={styles.text}>
        <Link to="/forgot-password" style={{ cursor: 'pointer', color: '#420e07' }}>Forgot Password?</Link>
      </Typography>
    </Box>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px auto',
    maxWidth: '600px',
  },
  header: {
    fontWeight: 'bold',
    color: '#420e07',
  },
  text: {
    marginBottom: '10px',
  },
  button: {
    marginTop: '20px',
    backgroundColor: '#420e07',
    color: 'white',
  },
};

export default Help;
