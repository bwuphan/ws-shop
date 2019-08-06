import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1 className="text-center">Sign Up</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            cart: false
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name ]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="container">
        <div class="card bg-light mb-3 mx-auto" style={{'max-width': '30rem'}}>
          <div class="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="username">User Name</label>
                <input
                  name="username"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group">
                <label for="email">Email Address</label>
                <input
                  name="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-group">
                <label for="passwordOne">Password</label>
                <input
                  name="passwordOne"
                  id="passwordOne"
                  className="form-control"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label for="passwordTwo">Password</label>
                <input
                  name="passwordTwo"
                  id="passwordTwo"
                  className="form-control"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group text-center">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isInvalid}
                >Sign Up</button>
              </div>
              {error && <p>{error.message}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);


export default SignUpPage;

export { SignUpForm, SignUpLink };