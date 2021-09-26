import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle)

function CreateContact(props) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [show, setShow] = useState('');

  const handleSubmit = (async () => {
    await fetch(`${process.env.REACT_APP_LINK_API}/contacts`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contact: { name: name, cpf: cpf, email: email, dateOfBirth: dateOfBirth, admin_id: 1 }
        })
      })
    setShow(false)
    setName('')
    setCpf('')
    setEmail('')
    setDateOfBirth('')
    props.loadContacts();
  });

  return (
    <div>
      <a className="btn-icon" href="#">
        <FontAwesomeIcon onClick={e => setShow(true)} icon={faPlusCircle} size="lg" />
      </a>

      <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Full Name" value={name || ''} onChange={e => setName(e.target.value)} />
          <Form.Control type="text" placeholder="CPF ex:000.000.000-00" value={cpf || ''} onChange={e => setCpf(e.target.value)} />
          <Form.Control type="text" placeholder="E-mail ex:test@test.com" value={email || ''} onChange={e => setEmail(e.target.value)} />
          <Form.Control type="text" placeholder="Date of Birth ex:00/00/0000" value={dateOfBirth || ''} onChange={e => setDateOfBirth(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-cancelar" onClick={e => setShow(false)}>
            Close
          </Button>
          <Form onSubmit={handleSubmit}>
            <Button className="btn-salvar" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateContact;