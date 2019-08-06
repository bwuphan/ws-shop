import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import ImageCarousel from '../ImageCarousel';


class ProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  }

  addToCart = () => {
    this.props.cart.addToCart(this.props.product.id);
  }

  render() {
    const product = this.props.product;
    const visible = this.state.visible || null;

    if (visible) {
      return (
        <Modal
          size="lg"
          centered
          show={visible}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">{product.name}</Modal.Title>
            <button className="btn btn-alert" onClick={this.toggleModal}>X</button>
          </Modal.Header>
          <Modal.Body>
            <h4 className="text-success text-center">
              ${product.priceRange.selling.low} - ${product.priceRange.selling.high}
            </h4>
            <ul>
              {product.messages.map((message, i) => <li key={i}>{message}</li>)}
            </ul>
            <ImageCarousel images={product.images}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <Button className="w-25" onClick={this.toggleModal}>View</Button>
      );
    };
  };
};

export default ProductModal;