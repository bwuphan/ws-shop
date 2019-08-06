import React from 'react';

import { AuthUserContext } from '../Session';
import Cart from '../Cart';

const checkout = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser &&
      <Cart authUser={authUser} />
    )}
  </AuthUserContext.Consumer>
);

export default checkout;