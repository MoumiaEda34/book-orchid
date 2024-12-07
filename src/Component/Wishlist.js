import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux'; // Assuming the user ID is in Redux store

const Wishlist = () => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user data from Redux
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://localhost:8000/wishlist");
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist data");
        }
        const data = await response.json();
        // Filter wishlist items by the logged-in user ID
        const filteredItems = data.filter(item => item.userId === user.id);
        setWishlistItems(filteredItems);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch wishlist only if the user is logged in
    if (user) {
      fetchWishlist();
    } else {
      setLoading(false); // No user, no wishlist data
    }
  }, [user]); // Re-run effect when the user changes

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/wishlist/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist");
      }
      // Remove the item from the state after successful deletion
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
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
          Please log in to view your wishlist.
        </Typography>
      </Box>
    );
  }

  return (
    <div className="wishlist-main">
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h4" sx={{ marginBottom: 2, color: '#420e07eb' }}>
          Your Wishlist
        </Typography>

        {/* All Wishlist Items Table */}
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="wishlist table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlistItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.cover_image} alt={item.title} height="80" />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(item)} // Open the details modal when clicked
                      sx={{ background: '#424242', color: '#fff' }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ marginLeft: 2, background: '#420e07eb', color: '#fff' }}
                      onClick={() => handleRemoveItem(item.id)} // Remove item from wishlist
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Item Details */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>
            {selectedItem?.title || "Loading..."}
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
            {selectedItem ? (
              <>
                <Typography variant="h6">Author: {selectedItem.author}</Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Description:</strong> {selectedItem.description}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Price:</strong> ${selectedItem.price}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>WishList By:</strong> {selectedItem.userName}
                </Typography>
                {selectedItem.option === "rent" && (
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Rent Dates:</strong> {selectedItem.fromDate} - {selectedItem.toDate}
                  </Typography>
                )}

                {/* Rating Section */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">Rating:</Typography>
                  <Box sx={{ display: 'flex', marginTop: 1 }}>
                    {renderRating(selectedItem.rating)}
                  </Box>
                </Box>
              </>
            ) : (
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Loading item details...
              </Typography>
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

export default Wishlist;
