import React, { Component } from 'react';

import CartContext from './context';

const withCart = Component => {
  class withCart extends Component {
    constructor(props) {
      super(props);

      this.state = {
        cart: {}
      };
    }


    addToCart = (id) => {
      console.log(this.state.cart);
      const cart = this.state.cart;
      if (id in cart) cart[id]++;
      else cart[id] = 1;

      this.setState({ cart });
      console.log(this.state);
    }

    render() {
      return (
        <CartContext.Provider value={this.state.cart}>
          <Component {...this.props} cart={this}/>
        </CartContext.Provider>
      );
    }
  }

  return withCart;
};

export default withCart;