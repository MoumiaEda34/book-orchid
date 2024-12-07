import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import bannerImage from '../assets/images/banner2.jpg';
import bannerImage2 from '../assets/images/banner1.jpg';
import './BannerSlider.css';
import { Link } from 'react-router-dom';
const BannerSlider = () => {
  var items = [
    {
      name: 'Step into Book Orchid: Discover, Learn, and Flourish.',
      description: 'Where Knowledge Blossoms and Stories Come to Life!',
      image: bannerImage,
    },
    {
      name: 'Book Orchid Welcomes You: A Place Where Every Story Begins.',
      description: 'Where Tales Bloom and Wisdom Grows!',
      image: bannerImage2,
    },
  ];
  return (
    <Carousel
      autoPlay={true}
      interval={3000}
      timeout={1000}
      indicatorIconButtonProps={{
        style: {
          padding: '5px',
          color: 'blue',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: 'red',
        },
      }}
      indicatorContainerProps={{
        style: {
          marginBottom: '-30px', // Position dots above the image
          position: 'relative',
        },
      }}
    >
      {items.map((item, i) => (
        <Paper className="banner-paper" key={i}>
          <img src={item.image} alt={item.name} className="banner-image" />
          <div className="banner-text">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <Button
              className="check-button"
              variant="contained"
              component={Link}
              to="/trending"
            >
              Check it out!
            </Button>
          </div>
        </Paper>
      ))}
    </Carousel>
  );
};

export default BannerSlider;
