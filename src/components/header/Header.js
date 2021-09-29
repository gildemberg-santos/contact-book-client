import React, { Component } from 'react';
import Input from 'react-bootstrap/InputGroup';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

library.add(faAddressBook)

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      user: ""
    }
  }

  async searchContact() {
    this.props.loadContacts(this.state.search);
  }

  render() {
    return (
      <div>
        <Navbar className="justify-content-between form-inline">
          <Navbar.Brand>
            <FontAwesomeIcon className="phone" icon={faAddressBook} size="lg" />
            <Navbar.Text>
              Agenda
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Text className="form-inline">
            <Form>
              <Form.Group>
                <Form.Control className="input-search" type="text" placeholder="Pesquisar" value={this.state.search} onChange={e => this.setState({ search: e.target.value })} />
                <Button className="btn-search" onClick={() => this.searchContact()}>Pesquisar</Button>
              </Form.Group>
            </Form>
          </Navbar.Text>
        </Navbar>
      </div >
    );
  }
}
export default Header;