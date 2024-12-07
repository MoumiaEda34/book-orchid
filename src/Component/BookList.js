import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Redux/booksSlice";
import BookCard from "./BookCard";
import { Grid, CircularProgress, Typography } from "@mui/material";

const BookList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <div className="trend-main">
    <Typography variant="h4" gutterBottom>
      Trending Book Collection
    </Typography>
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {items.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default BookList;