import React from 'react';
import ReactDOM from 'react-dom';
import PasswordChange from './index.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PasswordChange />, div);
});