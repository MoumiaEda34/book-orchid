import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import BookCard from "./BookCard";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const KidsBookSlider = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/kids")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("There was an error loading the books.");
        setLoading(false);
      });
  }, []);

  const arrowStyles = {
    background: "transparent",
    border: "none",
    padding: "10px",
    position: "absolute",
    top: "50%",
    zIndex: 1,
    cursor: "pointer",
    transform: "translateY(-50%)",
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: (
      <button className="slick-prev" style={arrowStyles}>
        <FaChevronLeft style={{ fontSize: "20px", color: "#000" }} />
      </button>
    ),
    nextArrow: (
      <button className="slick-next" style={arrowStyles}>
        <FaChevronRight style={{ fontSize: "20px", color: "#000" }} />
      </button>
    ),
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="kids-main">
      <h2>Kids</h2>
      <Slider {...settings}>
        {books.map((book) => (
          <div className="slider-section" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default KidsBookSlider;
