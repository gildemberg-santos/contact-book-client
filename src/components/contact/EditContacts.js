import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function EditContact(props) {
  const [name, setName] = useState(`${props.contact.name}`);
  const [cpf, setCpf] = useState(`${props.contact.cpf}`);
  const [email, setEmail] = useState(`${props.contact.email}`);
  const [dateOfBirth, setDateOfBirth] = useState(`${props.contact.dateOfBirth}`);
  const [show, setShow] = useState('');

  const handleSubmit = (async () => {
    await fetch(`${process.env.REACT_APP_LINK_API}/contacts/${props.contact.id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contact: { name: name, cpf: cpf, email: email, dateOfBirth: dateOfBirth, admin_id: props.contact.admin_id }
        })
      })

    setShow(false)
    props.loadContacts();
  });
  return (
    <div>
      <a className="btn-icon" href="#">
        <FontAwesomeIcon onClick={e => setShow(true)} icon={faEdit} size="sm" />
      </a>

      <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
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
  )
}

export default EditContact;