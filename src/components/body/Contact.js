import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListContact from './ListContacts';

class Contact extends Component {
  render() {
    return (
      <Row>
        <Col className="list">
          <ListContact loadContacts={this.props.loadContacts} contacts={this.props.contacts} />
        </Col>
      </Row>

    );
  }
}

export default Contact;

