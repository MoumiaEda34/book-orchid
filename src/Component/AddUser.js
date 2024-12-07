import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../Redux/Action";
import {
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress,
  Grid,
  Typography,
  Box,
  Paper,
  Container,
} from "@mui/material";

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('staff');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Basic validation checks
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone is required";
    if (phone && phone.length !== 10) newErrors.phone = "Phone number must be 10 digits";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length !== 6) newErrors.password = "Password must be 6 digits";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if email already exists
  const checkEmailExists = async (email) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/user');
      const users = await response.json();
      const existingUser = users.find(user => user.email === email);
      return existingUser ? true : false;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle email input change
  const handleEmailChange = async (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue.trim()) {
      const emailTaken = await checkEmailExists(emailValue);
      setEmailExists(emailTaken);
    } else {
      setEmailExists(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (emailExists) {
      return;
    }

    const user = { name, email, phone, role, password };
    dispatch(FunctionAddUser(user));
    navigate('/login');
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
            Register User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.email || emailExists}
                  helperText={emailExists ? "Email is already taken" : errors.email}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.phone}
                  helperText={errors.phone}
                  inputProps={{ maxLength: 10 }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password}
                  inputProps={{ maxLength: 6 }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  sx={{ marginBottom: 2 }}
                />
              </CardContent>
              <CardActions>
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{background: '#420e07eb' }}
                  fullWidth
                  disabled={emailExists || loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                </Button>
              </CardActions>
            </Card>
          </form>
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Link to="/login">Already have an account? Login</Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddUser;
