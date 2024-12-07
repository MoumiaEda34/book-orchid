import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract order data from navigation state
  const { order } = location.state || {};

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/orders/${order?.id}`);
        if (response.ok) {
          const data = await response.json();
          setOrderData(data);
        } else {
          setError('Failed to fetch order details');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (order?.id) {
      fetchOrderDetails();
    }
  }, [order?.id]);

  // If no order found or loading, display message
  if (loading) {
    return <Typography variant="h5" sx={{ marginTop: 4, textAlign: "center" }}>Loading order details...</Typography>;
  }

  if (error) {
    return <Typography variant="h5" sx={{ marginTop: 4, textAlign: "center", color: "error" }}>{error}</Typography>;
  }

  if (!orderData) {
    return <Typography variant="h5" sx={{ marginTop: 4, textAlign: "center" }}>Order not found</Typography>;
  }

  // Payment logic (you can replace this with actual payment gateway logic)
  const handlePayment = () => {
    // In a real scenario, you would integrate with a payment gateway (Stripe, PayPal, etc.)
    alert(`Payment of $${orderData.price * orderData.quantity} has been made successfully!`);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <Card sx={{ padding: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Book Title:</Typography>
              <Typography variant="body1">{orderData.title}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Author:</Typography>
              <Typography variant="body1">{orderData.author}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Quantity:</Typography>
              <Typography variant="body1">{orderData.quantity}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Price:</Typography>
              <Typography variant="body1">${orderData.price}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Total Price:</Typography>
              <Typography variant="body1">${orderData.price * orderData.quantity}</Typography>
            </Grid>
            {/* Conditionally render From Date and To Date */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">From Date:</Typography>
              <Typography variant="body1">{orderData.fromDate ? orderData.fromDate : 'Not available'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">To Date:</Typography>
              <Typography variant="body1">{orderData.toDate ? orderData.toDate : 'Not available'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Order Placed By:</Typography>
              <Typography variant="body1">{orderData.userName}</Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('/')}
              sx={{background: '#424242' }}
            >
              Go Back to Home
            </Button>
          </Box>

          {/* Pay Now Button */}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handlePayment}
              sx={{background: '#420e07eb' }}
            >
              Pay Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;
