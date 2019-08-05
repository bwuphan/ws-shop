import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Loader from '../Loader';

const imageCarousel = ({ images }) => {
  if (images && images.length > 0) {
    return (
      <Carousel>
        {images.map((image, i) =>
        <Carousel.Item key={i}>
          <img
            className="d-block w-100"
            src={image.href}
            alt={image.alt}
          />
        </Carousel.Item>
        )}
      </Carousel>
    );
  } else {
    return (
      <div className="text-center">
        <Loader color="primary"/>
      </div>
    );
  };
};

export default imageCarousel;