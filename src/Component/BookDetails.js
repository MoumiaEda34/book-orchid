import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
  Box,
  Rating,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OrderIcon from "@mui/icons-material/ShoppingCartCheckout";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};
  const user = useSelector((state) => state.auth.user);

  const defaultPrice = book?.purchase_price ?? 0;
  const rentPrice = book?.rent_price ?? 0;

  const [selectedOption, setSelectedOption] = useState("buy");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(defaultPrice);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    setPrice(option === "buy" ? defaultPrice : rentPrice);
  };

  const handleQuantityChange = (event) => {
    const value = Math.max(1, event.target.value);
    setQuantity(value);
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      setSnackbarMessage("You need to log in first to add to the wishlist.");
      setShowSnackbar(true);
      // Redirect to login page after showing snackbar
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    const wishlistItem = {
      ...book,
      option: selectedOption,
      quantity,
      price,
      total: price * quantity,
      fromDate: selectedOption === "rent" ? fromDate : null,
      toDate: selectedOption === "rent" ? toDate : null,
      userId: user?.id,
      userName: user?.name || "Guest",
    };

    try {
      const response = await fetch("http://localhost:8000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistItem),
      });

      if (response.ok) {
        const data = await response.json();
        setSnackbarMessage(`${book.title} added to wishlist!`);
        setShowSnackbar(true);
      } else {
        console.error("Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOrderBook = async () => {
    if (!user) {
      setSnackbarMessage("You need to log in first to place an order.");
      setShowSnackbar(true);
      // Redirect to login page after showing snackbar
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    const orderDetails = {
      title: book.title,
      author: book.author,
      option: selectedOption,
      quantity,
      price: price * quantity,
      fromDate: selectedOption === "rent" ? fromDate : null,
      toDate: selectedOption === "rent" ? toDate : null,
      userName: user?.name || "Guest",
      userId: user?.id || null,
    };

    try {
      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const data = await response.json();
        setSnackbarMessage(`Your order for "${book.title}" has been successfully placed!`);
        setShowSnackbar(true);
        navigate("/order-details", { state: { order: data } });
      } else {
        console.error("Failed to save order.");
        setSnackbarMessage("Failed to place your order. Please try again.");
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("An error occurred. Please try again.");
      setShowSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  if (!book) {
    return (
      <Typography variant="h5" sx={{ marginTop: 4, textAlign: "center" }}>
        No book details available.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "0 16px", marginTop: 4, marginBottom: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 600 }}>
            <CardMedia
              component="img"
              height="300"
              image={book.cover_image}
              alt={book.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h4">
                {book.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <strong>Author:</strong> {book.author}
              </Typography>
              <Typography variant="body1">
                <strong>Year:</strong> {book.publication_year}
              </Typography>
              <Typography variant="body1">
                <strong>Genres:</strong> {book.genre?.join(", ")}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                <strong>Description:</strong> {book.description}
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Rating:</Typography>
                <Rating value={book.rating} readOnly precision={0.5} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <FormControl fullWidth sx={{ marginTop: 4 }}>
              <InputLabel>Choose Option</InputLabel>
              <Select
                value={selectedOption}
                onChange={handleOptionChange}
                label="Choose Option"
              >
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
              </Select>
            </FormControl>

            {selectedOption === "rent" && (
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="To Date"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            )}

            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              fullWidth
              sx={{ marginTop: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Qty</InputAdornment>
                ),
              }}
            />

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              <strong>Total Price:</strong> ${price * quantity || 0}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 2, background: '#424242' }}
              startIcon={<FavoriteIcon />}
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 2, background: '#420e07eb' }}
              startIcon={<OrderIcon />}
              onClick={handleOrderBook}
            >
              Order Book
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default BookDetails;
