import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerSlider from './BannerSlider';
import BookSlider from './BookSlider';
import KidsBookSlider from './KidsBookSlider';
import { Button, Box, Typography, Grid, CircularProgress } from '@mui/material';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Paths to your PDF files
  const books = [
    {
      title: "The Book of Evelyn",
      pdfUrl: "http://localhost:3000/assets/pdf/book-of-evelyn.pdf",
      isAvailable: true, // Book is available to read
    },
    {
      title: "Jonathan Swift Biography",
      pdfUrl: "http://localhost:3000/assets/pdf/jonathanswiftbio0000coll.pdf",
      isAvailable: false, // Book is coming soon
    },
  ];

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track scroll position and show/hide the "Go to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Simulate loading process
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Example: Simulating login status check
    const user = localStorage.getItem('user'); // Assume login status is stored in localStorage
    if (user) {
      setIsLoggedIn(true);
    } else {
      // If the user is not logged in, navigate to the login page
      navigate('/login');
    }

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  // Redirect to the PDF file in a new tab
  const handleReadButtonClick = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          <BannerSlider />
          <BookSlider />
          <KidsBookSlider />

          {isLoggedIn ? (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Explore Our Featured Books
              </Typography>

              <Grid container spacing={4} style={{ padding: '20px' }}>
                {books.map((book, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <div className='featured-main'>
                      <Box
                        textAlign="center"
                        boxShadow={3}
                        padding="20px"
                        borderRadius="8px"
                        style={{ backgroundColor: '#f9f9f9' }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {book.title}
                        </Typography>
                        {book.isAvailable ? (
                          <Button
                            variant="contained"
                            onClick={() => handleReadButtonClick(book.pdfUrl)}
                            style={{ marginTop: '10px', background: '#420e07eb !important' }}
                          >
                            Read Now
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            style={{ marginTop: '10px', background: '#420e07eb !important' }}
                          >
                            Coming Soon
                          </Button>
                        )}
                      </Box>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Typography variant="h6" align="center" color="error" style={{ marginTop: '20px' }}>
              Please log in to view and access our featured books.
            </Typography>
          )}
        </>
      )}

      {isVisible && (
        <Button
          onClick={scrollToTop}
          variant="contained"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            borderRadius: '50%',
            background: '#fff',
            color: '#420e07eb',
            padding: '10px',
          }}
        >
          ↑
        </Button>
      )}
    </div>
  );
};

export default Home;
