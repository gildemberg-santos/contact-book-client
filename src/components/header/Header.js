import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import CreateContact from '../contact/create_contact/CreateContacts';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    }
  }

  async searchContact() {
    this.props.loadContacts(this.state.search);
  }

  render() {
    return (
      <div>
        <Navbar className="justify-content-between">
          <Navbar.Brand>
            <FontAwesomeIcon className="phone" icon={faPhone} size="sm" /> Contacts Directory
          </Navbar.Brand>
          <Form className="form-inline">
            <Form.Control className="form-control mr-sm-2" type="text" placeholder="Search" value={this.state.search} onChange={e => this.setState({ search: e.target.value })} />
            <Button className="btn-outline-success creare_contact_btn" onClick={() => this.searchContact()}>Search</Button>
          </Form>
          <Form className="form-inline">
            <CreateContact loadContacts={this.props.loadContacts} />
          </Form>
        </Navbar>
      </div>
    );
  }
}
export default Header;