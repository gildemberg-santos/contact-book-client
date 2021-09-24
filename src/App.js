import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import './App.scss';
import Contact from './components/contact/Contact'
import Header from './components/header/Header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faTrashAlt)

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container>
          <Contact />
        </Container>
      </div>
    );
  }
}

export default App;
