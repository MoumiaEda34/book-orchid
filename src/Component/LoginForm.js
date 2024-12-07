import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Container,
  InputAdornment,
} from '@mui/material';
import AddUser from './AddUser';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material'; // Import icons

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { isLoading, error, user } = useSelector((state) => state.auth);

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false); // Success modal state

  const validate = () => {
    if (!email || !password) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login({ password, email }));
    } else {
      alert('Please fill in both fields.');
    }
  };

  useEffect(() => {
    if (user) {
      setOpenSuccessModal(true);
      setTimeout(() => {
        setOpenSuccessModal(false);
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', textAlign: 'center', color: '#420e07' }}
      >
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={isLoading}
          variant="outlined"
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={isLoading}
          variant="outlined"
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ marginTop: 2, padding: '10px', background: '#420e07' }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            'Login'
          )}
        </Button>
      </form>

      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ marginTop: 2, textAlign: 'center' }}
        >
          {error}
        </Typography>
      )}

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginTop: 2, textAlign: 'center' }}
      >
        Don’t have an account?{' '}
        <span style={{ fontWeight: 'bold', color: '#3f51b5' }}>Register below</span>
      </Typography>

      <Button
        variant="outlined"
        onClick={() => setOpenRegisterModal(true)}
        sx={{
          marginTop: 2,
          width: '100%',
          padding: '10px',
          background: 'transparent',
          border: '1px solid #420e07',
          color: '#420e07',
        }}
      >
        Register
      </Button>

      <Typography
        variant="body2"
        color="primary"
        sx={{ marginTop: 1, textAlign: 'center', cursor: 'pointer' }}
        onClick={() => setOpenForgotPasswordModal(true)}
      >
        Forgot Password?
      </Typography>

      {/* Success Modal for Login */}
      <Dialog open={openSuccessModal} onClose={() => setOpenSuccessModal(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <Typography variant="h6" sx={{ textAlign: 'center', color: 'green' }}>
            Login Successful!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
            You have logged in successfully. Redirecting...
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Modal for AddUser */}
      <Dialog open={openRegisterModal} onClose={() => setOpenRegisterModal(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <AddUser />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRegisterModal(false)} color="secondary" sx={{ width: '100%' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Forgot Password */}
      <Dialog open={openForgotPasswordModal} onClose={() => setOpenForgotPasswordModal(false)} fullWidth maxWidth="xs">
        <DialogContent>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Reset Your Password
          </Typography>
          <TextField
            label="Enter your email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, padding: '10px' }}
            onClick={() => {
              alert('Password reset link sent to your email!');
              setOpenForgotPasswordModal(false);
            }}
          >
            Submit
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForgotPasswordModal(false)} color="secondary" sx={{ width: '100%' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoginForm;
