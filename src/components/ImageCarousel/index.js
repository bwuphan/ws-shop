import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Loader from '../Loader';

class ImageCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  }

  render() {
    const images = this.props.images;
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
      return (<div className="text-center"><Loader color="primary"/></div>)
    }
  }
}

export default ImageCarousel;