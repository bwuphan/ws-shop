import React, { Component } from 'react';


import data from '../../resource/data.js';

import { withFirebase } from '../Firebase';
import Product from '../Product';
import Loader from '../Loader';


class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      products: null,
      data: null,
      cart: {}
    }
  }

  componentDidMount() {
    this.setState({ products: JSON.parse(data).groups });

    if (this.props.authUser) {
      this.setState({ loading: true })
      this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
        const userObject = snapshot.val();

        if (userObject.cart) {
          this.setState({ cart: userObject.cart });
        }
        this.setState({ loading: false });
      });
    };
  };

  componentWillUnmount() {
    if (this.props.authUser) {
      this.props.firebase.user(this.props.authUser.uid).off();
    }
  }

  addToCart = (id) => {
    const cart = this.state.cart;
    if (id in cart) cart[id]++;
    else cart[id] = 1;

    this.setState({ cart });
    if (this.props.authUser) {
      this.props.firebase.doUpdateCart(cart, this.props.authUser.uid);
    }
  }

  groupProducts = (products, num) =>
    products.reduce((newArr, prod, i) => {
      if (i % num === 0) newArr.push([prod]);
      else newArr[newArr.length - 1].push(prod);
      return newArr;
    }, []);


  render() {
    let { products } = this.state;
    if (products) {
      products = this.groupProducts(products, 3);
      return (
        <div className="d-flex flex-column justify-content-center">
          {products.map((group, i) =>
            <div className="products__group d-flex" key={i}>
              {group.map((product, j) =>
                <Product
                  product={product}
                  idx={j}
                  key={j}
                  addToCart={this.addToCart}
                  isSignedIn={!!this.props.authUser}
                />
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (<Loader />)
    };
  };
};

export default withFirebase(Products);