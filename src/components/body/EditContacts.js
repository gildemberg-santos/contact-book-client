import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { cpfMask, dateMask } from './Mask';
import { StatusCode, ValidarCompoDate } from './VerificarStatusCode';

function EditContact(props) {
  const [name, setName] = useState(`${props.contact.name}`);
  const [cpf, setCpf] = useState(`${props.contact.cpf}`);
  const [email, setEmail] = useState(`${props.contact.email}`);
  const [dateOfBirth, setDateOfBirth] = useState(`${props.contact.dateOfBirth}`);
  const [show, setShow] = useState('');

  const handleSubmit = (async () => {

    if (ValidarCompoDate(dateOfBirth)) {
      let response = await fetch(`${process.env.REACT_APP_LINK_API}/contacts/${props.contact.id}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contact: { name: name, cpf: cpf, email: email, dateOfBirth: dateOfBirth }
          })
        });

      if (StatusCode(response.status)) {
        setShow(false);
        props.loadContacts();
      }

    }

  });

  return (
    <div>
      <a className="btn-icon" href="#">
        <FontAwesomeIcon onClick={e => setShow(true)} icon={faEdit} size="sm" />
      </a>

      <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Contato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Nome Completo" value={name || ''} onChange={e => setName(e.target.value)} />
          <Form.Control type="text" placeholder="CPF ex:000.000.000-00" value={cpf || ''} onChange={e => setCpf(cpfMask(e.target.value))} />
          <Form.Control type="text" placeholder="E-mail ex:test@test.com" value={email || ''} onChange={e => setEmail(e.target.value)} />
          <Form.Control type="text" placeholder="Data de Nascimento ex:00/00/0000" value={dateOfBirth || ''} onChange={e => setDateOfBirth(dateMask(e.target.value))} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-cancelar" onClick={e => setShow(false)}>
            Cancelar
          </Button>
          <Form onSubmit={handleSubmit}>
            <Button className="btn-salvar" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditContact;