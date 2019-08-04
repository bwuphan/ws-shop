import React from 'react';

import Products from '../Products';
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Products />
  </div>
);


export default HomePage;