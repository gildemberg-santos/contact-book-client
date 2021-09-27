import React, { Component } from 'react';
import Input from 'react-bootstrap/InputGroup';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret)

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <a href="#">
          sdfafdasdf
          <FontAwesomeIcon className="check" icon={faUserSecret} size="lg" />
        </a>
      </div>
    );
  }
}

export default Login;