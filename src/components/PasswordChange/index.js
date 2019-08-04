import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <div className="card bg-light mb-3 mx-auto max-width-30">
        <div className="card-header text-center">Change Password</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="passwordOne">New Password</label>
            <input
              name="passwordOne"
              id="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="New Password"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordTwo">Confirm Password</label>
            <input
              name="passwordTwo"
              id="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm New Password"
              className="form-control"
            />
          </div>
          <div className="form-group text-center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isInvalid}
            >
              Reset My Password
            </button>
          </div>
            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);