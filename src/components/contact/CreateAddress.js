import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle)

function CreateAddress(props) {
    // cep
    // road
    // number
    // district
    // city
    // states
    const [show, setShow] = useState('');
    const [cep, setCep] = useState('');
    const [road, setRoad] = useState('');
    const [number, setNumber] = useState('');
    const [distrinct, setDistrinct] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');

    const handleSubmit = (async () => {
        await fetch(`${process.env.REACT_APP_LINK_API}/addresses`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Falta os IDs
                    address: { cep: cep, road: road, number: number, distrinct: distrinct, states: states, contact_id: props.contact.id, admin_id: 1 }
                })
            });
        setShow(false);
        setCep('');
        setRoad('');
        setNumber('');
        setDistrinct('');
        setCity('');
        setStates('');
        props.loadAddresses(props.contact);
    });

    return (
        <div>
            <a className="btn-icon" href="#">
                <FontAwesomeIcon onClick={e => setShow(true)} icon={faPlusCircle} size="sm" />
            </a>
            <Modal show={show || false} onHide={e => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>New Addreess</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" placeholder="" value={cep || ''} onChange={e => setCep(e.target.value)} />
                    <Form.Control type="text" placeholder="" value={road || ''} onChange={e => setRoad(e.target.value)} />
                    <Form.Control type="text" placeholder="" value={number || ''} onChange={e => setNumber(e.target.value)} />
                    <Form.Control type="text" placeholder="" value={distrinct || ''} onChange={e => setDistrinct(e.target.value)} />
                    <Form.Control type="text" placeholder="" value={city || ''} onChange={e => setCity(e.target.value)} />
                    <Form.Control type="text" placeholder="" value={states || ''} onChange={e => setStates(e.target.value)} />
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


export default CreateAddress;