import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

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
    console.log(JSON.parse(data));
    // function getJSON(url, qs_params) {
    //   function buildQueryString(params) {
    //     return Object.entries(params).map(d => `${d[0]}=${d[1]}`).join('&');
    //   }

    //   return new Promise((resolve, reject) => {
    //     const qs = qs_params ? '?' + buildQueryString(qs_params) : '';
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', `${url}${qs}`);

    //     xhr.onload = function() {
    //       if (xhr.status >= 200 && xhr.status < 400) {
    //         resolve(JSON.parse(xhr.responseText));
    //       } else {
    //         resolve(xhr.responseText);
    //       }
    //     };
    //     xhr.onerror = () => reject(xhr.statusText);
    //     xhr.send();
    //   });
    // }
    // console.log('here');
    // getJSON('https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json').then(results => console.log(results));'

    // this.setState({ loading: true });

    // this.props.firebase.Products().on('value', snapshot => {
    //   const messagesObject = snapshot.val();

    //   const Products = Object.keys(messagesObject).map(key => messagesObject[key]).reverse();
    //   this.setState({ Products, loading: false })
    // });

    // this.props.firebase.users().on('value', snapshot => {
    //   const usersObject = snapshot.val();

    //   this.setState({
    //     users: usersObject,
    //     loading: false
    //   });
    // });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
    // this.props.firebase.Products().off();
  }

  render() {
    const { products } = this.state;
    if (products) {
      return (
        <div>
          {products.map((product, i) =>
            <div className="card" style={{'width': '18rem'}} key={i}>
              <img className="card-img-top" src={product.hero.href} alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
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