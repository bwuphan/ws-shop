import React from 'react';

import ProductModal from '../ProductModal';
import Loader from '../Loader';

const product = ({ product, idx }) => (
  <div className="p-3 d-flex justify-content-center" key={idx}>
    <div className="card height-31 width-20 d-flex align-content-between">
      <img className="card-img-top" src={product.hero.href} alt="Card image cap"></img>
      <div className="card-body">
        <h6 className="card-title text-center">{product.name}</h6>
        <p className="card-text text-success font-weight-bold text-center">
          From ${product.priceRange.selling.low} - ${product.priceRange.selling.high}
        </p>
      </div>
      <ProductModal product={product}/>
    </div>
  </div>
);

export default product;