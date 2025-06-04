import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TacoCarousel.css';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/images/taco1.png',
    title: 'Great Taste. Great Value.',
    subtitle: 'Świeże, pyszne tacosy na każdą okazję.',
    buttonText: 'Zamów teraz',
    link: '/login'
  },
  {
    image: '/images/taco2.png',
    title: 'Twoje taco, Twoje zasady.',
    subtitle: 'Skonfiguruj własne taco z ulubionych składników.',
    buttonText: 'Zarejestruj się',
    link: '/register'
  }
];

const TacoCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div className="carousel-slide" key={index}>
          <img src={slide.image} alt="taco background" className="carousel-image" />
          <div className="carousel-overlay">
            <Typography variant="h3" className="carousel-title">
              {slide.title}
            </Typography>
            <Typography variant="h6" className="carousel-subtitle">
              {slide.subtitle}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={slide.link}
              sx={{ mt: 2, px: 4, textTransform: 'none', fontWeight: 'bold' }}
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TacoCarousel;
