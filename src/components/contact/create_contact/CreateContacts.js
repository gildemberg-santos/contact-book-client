import React, { useState } from 'react';
import Model from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CreateContact(props) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [show, setShow] = useState('');

  const handleSubmit = (async () => {
    // console.log(handleSubmit)
    await fetch('http://localhost:3001/contacts',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contact: { name: name, cpf: cpf, email: email, dateOfBirth: dateOfBirth, admin_id: 1 }
        })
      }
    )
    setShow(false)
    setName('')
    setCpf('')
    setEmail('')
    setDateOfBirth('')
    props.loadContacts();
  });

  return (
    <div>
      <Button onClick={e => setShow(true)} variant="dark" className="float-right creare_contact_btn">+ Contact</Button>

      <Model show={show || false} onHide={e => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="name" placeholder="Full Name" value={name || ''} onChange={e => setName(e.target.value)} />
          <Form.Control type="cpf" placeholder="CPF ex:000.000.000-00" value={cpf || ''} onChange={e => setCpf(e.target.value)} />
          <Form.Control type="email" placeholder="E-mail ex:test@test.com" value={email || ''} onChange={e => setEmail(e.target.value)} />
          <Form.Control type="dateOfBirth" placeholder="Date of Birth ex:00/00/0000" value={dateOfBirth || ''} onChange={e => setDateOfBirth(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => setShow(false)}>
            Close
          </Button>
          <Form onSubmit={handleSubmit}>
            <Button variant="dark" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Footer>
      </Model>
    </div>
  );
}

export default CreateContact;