import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Paper, TextField, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux'; // Assuming the user ID is in Redux store

const OrderList = () => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user data from Redux
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [page, setPage] = useState(1); // For pagination
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch order data");
        }
        const data = await response.json();
        // Filter orders by the logged-in user ID
        const filteredOrders = data.filter(order => order.userId === user.id);
        setOrderItems(filteredOrders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch orders only if the user is logged in
    if (user) {
      fetchOrders();
    } else {
      setLoading(false); // No user, no order data
    }
  }, [user]); // Re-run effect when the user changes

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the order");
      }
      // Remove the order from the state after successful deletion
      setOrderItems((prevOrders) => prevOrders.filter(order => order.id !== orderId));
      handleCloseModal(); // Close the modal after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to render star rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon key={i} sx={{ color: i < rating ? 'gold' : 'gray' }} />
      );
    }
    return stars;
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page on search input change
  };

  // Filter orders based on search query
  const filteredOrders = orderItems.filter(order =>
    order.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const startIndex = (page - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h6" color="error">
          Please log in to view your orders.
        </Typography>
      </Box>
    );
  }

  return (
    <div className="orderlist-main">
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h4" sx={{ marginBottom: 2, color: '#420e07eb' }}>
          Your Orders
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search by Book Title"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />

        {/* All Orders Table */}
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="order table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.title}</TableCell>
                  <TableCell>{order.author}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(order)} // Open the details modal when clicked
                      sx={{ background: '#424242', color: '#fff' }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ marginLeft: 2, background: '#420e07eb', color: '#fff' }}
                      onClick={() => handleDeleteOrder(order.id)} // Delete order
                    >
                      Delete Order
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(filteredOrders.length / ordersPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ marginTop: 2 }}
        />

        {/* Modal for Order Details */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>
            {selectedOrder?.title || "Loading..."}
            <Button
              onClick={handleCloseModal}
              sx={{ position: "absolute", top: 16, right: 16, background: '#420e07eb' }}
              variant="contained"
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          </DialogTitle>
          <DialogContent>
            {selectedOrder ? (
              <>
                <Typography variant="h6">Author: {selectedOrder.author}</Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Description:</strong> {selectedOrder.description}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Price:</strong> ${selectedOrder.price}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Ordered By:</strong> {selectedOrder.userName}
                </Typography>
                {selectedOrder.option === "rent" && (
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Rent Dates:</strong> {selectedOrder.fromDate} - {selectedOrder.toDate}
                  </Typography>
                )}

                {/* Rating Section */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">Rating:</Typography>
                  <Box sx={{ display: 'flex', marginTop: 1 }}>
                    {renderRating(selectedOrder.rating)}
                  </Box>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteOrder(selectedOrder.id)} // Delete order button
                    sx={{ marginTop: 2 }}
                  >
                    Delete Order
                  </Button>
                </Box>
              </>
            ) : (
              <CircularProgress />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default OrderList;
