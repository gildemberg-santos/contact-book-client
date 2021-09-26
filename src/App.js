import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import './App.scss';
import Header from './components/header/Header';
import Contact from './components/contact/Contact'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faTrashAlt)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
    this.loadContacts = this.loadContacts.bind(this);
  }

  async loadContacts(q = '') {
    try {
      let response = await fetch(`${process.env.REACT_APP_LINK_API}/contacts?contact[q]=${q}`);
      const contacts = await response.json();
      this.setState({ contacts: contacts });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.loadContacts();
  }

  render() {
    return (
      <div>
        <Header loadContacts={this.loadContacts} />
        <Container>
          <Contact loadContacts={this.loadContacts} contacts={this.state.contacts} />
        </Container>
      </div>
    );
  }
}

export default App;
