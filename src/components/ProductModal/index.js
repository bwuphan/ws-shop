import React, { Component } from 'react';
import { Modal, Button, Header } from 'react-bootstrap';

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

  render() {
    const product = this.props.product;
    const visible = this.state.visible || null;
    if (visible) {
      return (
        <div>
          <div className="text-center">
            <Button onClick={this.toggleModal}>View</Button>
          </div>
          <Modal
            size="lg"
            centered
            show={visible}
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                {product.name}
              </Modal.Title>
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
        </div>
      )
    } else {
      return (
        <div className="text-center pb-2">
          <Button onClick={this.toggleModal}>View</Button>
        </div>
      );
    }
  }
}

export default ProductModal;