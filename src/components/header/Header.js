import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSlash, faPhone } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Brand>
            <FontAwesomeIcon className="phone" icon={faPhone} size="lg" /> Contacts Directory
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}
export default Header;