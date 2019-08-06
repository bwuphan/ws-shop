import React from 'react';
import { AuthUserContext } from '../Session';
import Products from '../Products';
const HomePage = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ?
        <Products authUser={authUser} />
        : <Products />
      )}
    </AuthUserContext.Consumer>
  </div>
);


export default HomePage;