import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { cpfMask, dateMask } from './Mask';
import { StatusCode, ValidarCompoDate } from './VerificarStatusCode';

library.add(faPlusCircle)

function CreateContact(props) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [show, setShow] = useState('');

  const handleSubmit = (async () => {

    if (ValidarCompoDate(dateOfBirth)) {
      let response = await fetch(`${process.env.REACT_APP_LINK_API}/contacts`,
        {
          method: 'POST',
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
        setName('');
        setCpf('');
        setEmail('');
        setDateOfBirth('');
        props.loadContacts();
      }
    }

  });

  return (
    <div>
      <span className="btn-icon btn">
        <FontAwesomeIcon onClick={e => setShow(true)} icon={faPlusCircle} size="lg" />
      </span>

      <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Contato</Modal.Title>
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
  );
}

export default CreateContact;