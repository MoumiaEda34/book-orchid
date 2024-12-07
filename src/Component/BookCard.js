import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/book-details/${book.id}`, { state: { book } });
  };

  return (
    <div className="book-card-main">
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={book.cover_image}
        alt={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Author:</strong> {book.author}
        </Typography>
        <Button
          variant="contained"
          onClick={handleDetailsClick}
          sx={{ marginTop: 2 ,background: '#420e07eb !important'}}
        >
          Checked Out
        </Button>
      </CardContent>
    </Card>
    </div>
  );
};

export default BookCard;
