import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import CreateContact from './create_contact/CreateContacts';


class Contact extends Component {
  render() {
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="contacts_list">
          <p name="top" className="title">
            Contacts
          </p>
          <List loadContacts={this.props.loadContacts} contacts={this.props.contacts} />
        </Col>
      </Row>
    );
  }
}

export default Contact;

