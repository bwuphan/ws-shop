import React from 'react';
import { AuthUserContext } from '../Session';
import Products from '../Products';
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <AuthUserContext.Consumer>
      {authUser => (authUser &&
        <Products authUser={authUser} />
      )}
    </AuthUserContext.Consumer>
  </div>
);


export default HomePage;