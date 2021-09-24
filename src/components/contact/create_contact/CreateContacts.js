import React, { useState } from 'react';
import Model from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateContact(props) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [adminId, setAdminId] = useState('');
  const [show, setShow] = useState('');

  const handleSubmit = (async () => {
    await fetch(`http://127.0.0.1:3001/contacts`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          constact: { name: name, cpf: cpf, email: email, dateOfBirth: dateOfBirth, admin_id: adminId }
        })
      }
    )
    setShow(false)
    setName('')
    setCpf('')
    setEmail('')
    setDateOfBirth('')
    setAdminId('')
    props.loadContacts();
  });

  return (
    <div>
      <Button onClick={e => setShow(true)} variant="dark" className="float-right creare_contact_btn">+ Contact</Button>
      <Model show={show || false} onHide={e => setShow(false)}>
        <Modal.Headers closeButton>
          <Modal.Title>New Contact</Modal.Title>
        </Modal.Headers>
        <Modal.Body>
          {/* Parei da criaçao do corpo do cadastro de contato */}
        </Modal.Body>
      </Model>
    </div>
  );
}

export default CreateContact;