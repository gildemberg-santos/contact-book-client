import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateContact from './create_contact/CreateContacts';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
    this.loadContacts = this.loadContacts.bind(this);
  }

  async loadContacts() {
    let response = await fetch(`http://localhost:3001/contacts`);
    const contacts = await response.json();
    this.setState({ contacts: contacts });
  }

  componentDidMount() {
    this.loadContacts();
  }

  render() {
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="contacts_list">
          <CreateContact className="add" loadContacts={this.contacts} />
          {/* <a className="add" href="#">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </a> */}
          <p name="top" className="title">
            Contacts
          </p>
          <List contacts={this.state.contacts} />
        </Col>
      </Row>
    );
  }
}

export default Contact;

