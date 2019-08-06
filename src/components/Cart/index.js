import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Loader from '../Loader';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: '',
      cart: []
    }

  };

  componentDidMount() {
    this.setState({ loading: true })
    this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
      const userObject = snapshot.val();

      const cart = Object.keys(userObject.cart).map(id => {
        return {
          quantity: userObject.cart[id],
          id: id
        }
      });
      this.setState({
        username: userObject.username,
        loading: false,
        cart
      });
    });
  };

  componentWillUnmount() {
    this.props.firebase.user(this.props.authUser.uid).off();
  };

  checkout = () => {
    this.props.firebase.doUpdateCart(false, this.props.authUser.uid)
      .then(() => alert('thank you for your purchase!'));
  };

  render() {
    const { username, cart, loading } = this.state;
    if (!loading) {
      return (
      <div className="container pt-5">
        <h2 className="text-center card-header border">{username}'s Cart</h2>
          <table className="table table-bordered table-striped w-100">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={this.checkout} disabled={!cart.length}>Check Out</button>
        </div>
      );
    } else {
      return <Loader />
    };
  };
};

export default withFirebase(Cart);
