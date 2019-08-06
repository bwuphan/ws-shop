import React from 'react';

import ProductModal from '../ProductModal';

const product = ({ product, idx, addToCart, isSignedIn }) => (
  <div className="p-3 d-flex justify-content-center" key={idx}>
    <div className="card min-height-28 width-16 d-flex align-content-between shadow-sm">
      <img className="card-img-top" src={product.hero.href} alt={`${product.name}`}></img>
      <div className="card-body">
        <h6 className="card-title text-center">{product.name}</h6>
        <p className="card-text text-success font-weight-bold text-center">
          From ${product.priceRange.selling.low} - ${product.priceRange.selling.high}
        </p>
      </div>
      <div className="d-flex justify-content-around pb-2">
      {isSignedIn && <button className="btn btn-primary w-25" onClick={() => addToCart(product.id)}>Add</button>}
      <ProductModal product={product}/>
      </div>
    </div>
  </div>
);

export default product;