import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas, faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faGlobeAmericas)

function Address(props) {
  const [show, setShow] = useState('');
  return (
    <div>
      <a className="btn-icon" href="#">
        <FontAwesomeIcon onClick={e => setShow(true)} icon={faGlobeAmericas} size="sm" />
      </a>

      <Modal show={show || false} onHide={e => setShow(false)}>
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
                            <FontAwesomeIcon icon={faPlusCircle} size="sm" />
                          </a>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-cancelar" onClick={e => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Address;