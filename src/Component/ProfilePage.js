import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, Avatar, Grid, Divider } from '@mui/material';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Typography
        variant="h6"
        align="center"
        color="error"
        sx={{ mt: 5 }}
      >
        No user data found!
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5, px: 2, marginBottom: '30px' }}>
      <Card sx={{ padding: 3, boxShadow: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: '#420e07',
                fontSize: '2rem',
                margin: 'auto',
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {user.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>
              Profile Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {user.phone || 'Not Provided'}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ProfilePage;
