import React from 'react';

const CartContext = React.createContext(null);


export const withCart = Component => props => (
  <CartContext.Consumer>
    {cart => <Component {...props} cart={cart} />}
  </CartContext.Consumer>
);

export default CartContext;