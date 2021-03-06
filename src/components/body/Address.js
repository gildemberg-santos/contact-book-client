import React, { Component } from "react";

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

import ListAddress from './ListAddress';
import CreateAddress from './CreateAddress';

library.add(faGlobeAmericas)

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.state = {
            addresses: []
        };
        this.loadAddresses = this.loadAddresses.bind(this);
    }

    async statelist(valor = false) {
        this.setState({ show: valor });
    }

    async loadAddresses(contact) {
        try {
            let response = await fetch(`${process.env.REACT_APP_LINK_API}/addresses?address[contact_id]=${contact.id}`);
            const addresses = await response.json();
            this.setState({ addresses: addresses });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.loadAddresses(this.props.contact);
    }

    render() {
        return (
            <div>
                <span onClick={e => this.setState({ show: true })} className="btn-icon btn">
                    <FontAwesomeIcon icon={faGlobeAmericas} size="sm" />
                </span>


                <Modal show={this.state.show || false} onHide={e => this.setState({ show: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Endereços
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
                                                        <CreateAddress statelist={this.statelist} loadAddresses={this.loadAddresses} contact={this.props.contact} onClick={e => this.setState({ show: false })} />
                                                    </td>
                                                </tr>
                                            </thead>
                                            <ListAddress loadAddresses={this.loadAddresses} addresses={this.state.addresses} contact={this.props.contact} />
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-cancelar" onClick={e => this.setState({ show: false })}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}

export default Address;