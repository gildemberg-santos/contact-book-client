import React, { useState } from 'react';
import Model from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function CreateAddress(props) {
  const [cep, setCep] = useState('');
  const [road, setRoad] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [states_, setStates_] = useState('');
  const [show, setShow] = useState('');

  const handleSubmit = (async () => {
    await fetch(`${process.env.REACT_APP_LINK_API}/addresses`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: { cep: cep, road: road, number: number, district: district, city: city, states: states_, contact_id: 1, admin_id: 1 }
        })
      })
    setShow(false);
    setCep('');
    setRoad('');
    setNumber('');
    setDistrict('');
    setCity('');
    setStates_('');
    props.loadAddresses();
  });

  return (
    <div>
      <a className="check" href="#">
        <FontAwesomeIcon onClick={e => setShow(true)} icon={faPlusCircle} size="lg" />
      </a>

      <Model show={show || false} onHide={e => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="CEP ex: 00000-000" value={cep || ''} onChange={e => setName(e.target.value)} />
          <Form.Control type="text" placeholder="Road" value={road || ''} onChange={e => setCpf(e.target.value)} />
          <Form.Control type="text" placeholder="Númber" value={number || ''} onChange={e => setEmail(e.target.value)} />
          <Form.Control type="text" placeholder="District" value={district || ''} onChange={e => setDateOfBirth(e.target.value)} />
          <Form.Control type="text" placeholder="City" value={city || ''} onChange={e => setDateOfBirth(e.target.value)} />
          <Form.Control type="text" placeholder="States" value={states_ || ''} onChange={e => setDateOfBirth(e.target.value)} />
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

export default CreateAddress;