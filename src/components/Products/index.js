import React, { Component } from 'react';


import data from '../../resource/data.js';

import { withFirebase } from '../Firebase';
import Product from '../Product';
import ProductModal from '../ProductModal';
import Loader from '../Loader';
import { AuthUserContext } from '../Session';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      products: null,
      users: {},
      data: null,
      cart: {}
    }
  }

  componentDidMount() {
    this.setState({ products: JSON.parse(data).groups, loading: true });
    if (this.props.authUser) {
      this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
        const userObject = snapshot.val();

        if (userObject.cart) {
          this.setState({ cart: {} });
        }
      });
    }
    console.log(this.props.authUser);
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
      <AuthUserContext.Consumer>
        {authUser => (
        <div className="d-flex flex-column justify-content-center">
          <pre>{authUser && authUser.uid}</pre>
          {products.map((group, i) =>
            <div className="products__group d-flex" key={i}>
              {group.map((product, j) =>
                <Product product={product} idx={j} key={j} />
              )}
            </div>
          )}
        </div>
        )}
      </AuthUserContext.Consumer>
      );
    } else {
      return (<Loader />)
    }
  }
}

export default withFirebase(Products);