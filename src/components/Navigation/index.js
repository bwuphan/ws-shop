import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to={ROUTES.HOME}>
      <img width="80"
        src="https://images.vexels.com/media/users/3/128426/isolated/preview/4fda912936524335c7ccb850afb9d061-pineapple-sliced-circle-icon-by-vexels.png"
        alt="kings_logo"
        />
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
  </nav>
);

const NavigationAuth = () => (
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <span className="nav-link" href="#">
          <Link className="text-decoration-none" to={ROUTES.ACCOUNT}>Account</Link>
        </span>
      </li>
      <li className="nav-item">
        <span className="nav-link" href="#">
          <Link className="text-decoration-none" to={ROUTES.CHECKOUT}>Checkout</Link>
        </span>
      </li>
    </ul>
    <SignOutButton />
  </div>

);

const NavigationNonAuth = () => (
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mr-auto">
    </ul>
    <div className="nav-item">
      <span className="nav-link" href="#">
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </span>
    </div>
  </div>
);

export default Navigation;