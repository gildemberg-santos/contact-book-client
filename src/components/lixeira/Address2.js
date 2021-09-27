import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas, faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import CreateAddress from '../contact/CreateAddress';

library.add(faGlobeAmericas)

function Address(props) {

  const [showlist, setShowList] = useState('');
  const [showcreate, setShowCreate] = useState('');
  const [addresses, setAddresses] = useState([]);
  // Variaveis cadastro
  const [cep_add, setCepAdd] = useState('');
  const [road_add, setRoadAdd] = useState('');
  const [number_add, setNumberAdd] = useState('');
  const [district_add, setDistrictAdd] = useState('');
  const [city_add, setCityAdd] = useState('');
  const [states_add, setStatesAdd] = useState('');
  // cep
  // road
  // number
  // district
  // city
  // states

  const cineListAddress = (async () => {
    setShowList(true);
    setShowCreate(false);
    // loadAddresses(props.contact);
  });

  const loadAddresses = (async (contact) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_LINK_API}/addresses?address[contact_id]=${contact.id}&address[admin_id]=${1}`);
      const addresses = await response.json();
      console.log(addresses);
      setAddresses(addresses);
    } catch (e) {
      console.log("Erro do loadAddresses");
      console.log(e);
    }
  });


  const cinecreateAddress = (async () => {
    setShowList(false);
    setShowCreate(true);
    // loadAddresses(props.contact);
  });

  // loadAddresses(props.contact);

  return (
    <div>
      <a className="btn-icon" href="#">
        <FontAwesomeIcon onClick={e => setShowList(true)} icon={faGlobeAmericas} size="sm" />
      </a>

      <Modal show={showlist || false} onHide={cineListAddress}>
        <Modal.Header closeButton>
          <Modal.Title>
            Addresses
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="list">
              <Card>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <td colSpan="2"></td>
                        <td>
                          <a className="btn-icon" href="#">
                            <FontAwesomeIcon icon={faPlusCircle} size="sm" onClick={cinecreateAddress} />
                          </a>

                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        addresses.map((address, index) => {
                          return <tr key={address.id}>
                            <td className="col-md-10">
                              <p className="info-list">Travessa Maria Luiza Baima, 168, Tabajara, Aquiraz - Ceará, 61700-000</p>
                            </td>
                            <td>
                              <a className="btn-icon" href="#">
                                <FontAwesomeIcon icon={faEdit} size="sm" />
                              </a>
                            </td>
                            <td>
                              <a className="btn-icon" href="#">
                                <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                              </a>
                            </td>
                          </tr>;
                        }) || <div></div>}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-cancelar" onClick={e => setShowList(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*
      Tela Create
      */}
      <Modal show={showcreate || false} onHide={e => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Addresses Create
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" placeholder="CEP ex: 00000-000" value={cep_add || ''} onChange={e => setCepAdd(e.target.value)} />
            <Form.Control type="text" placeholder="Road" value={road_add || ''} onChange={e => setRoadAdd(e.target.value)} />
            <Form.Control type="text" placeholder="Númber" value={number_add || ''} onChange={e => setNumberAdd(e.target.value)} />
            <Form.Control type="text" placeholder="District" value={district_add || ''} onChange={e => setDistrictAdd(e.target.value)} />
            <Form.Control type="text" placeholder="City" value={city_add || ''} onChange={e => setCityAdd(e.target.value)} />
            <Form.Control type="text" placeholder="States" value={states_add || ''} onChange={e => setStatesAdd(e.target.value)} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-cancelar" onClick={cineListAddress}>
            Close
          </Button>
          <Form>
            <Button variant="dark" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default Address;