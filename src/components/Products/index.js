import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import ProductModal from '../ProductModal';
import Loader from '../Loader';
import data from '../../resource/data.js';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      products: null,
      users: {},
      data: null
    }
  }

  componentDidMount() {
    this.setState({ products: JSON.parse(data).groups });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
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
                <div className="p-3 d-flex justify-content-center">
                  <div className="card height-31 width-20 d-flex align-content-between" key={j}>
                    <img className="card-img-top" src={product.hero.href} alt="Card image cap"></img>
                    <div className="card-body">
                      <h6
                        onClick={this.groupProducts}
                        className="card-title text-center"
                      >{product.name}</h6>
                      <p className="card-text text-success font-weight-bold text-center">
                        From ${product.priceRange.selling.low} - ${product.priceRange.selling.high}
                      </p>
                    </div>
                    <ProductModal product={product}/>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (<Loader />)
    }
  }
}

export default withFirebase(Products);