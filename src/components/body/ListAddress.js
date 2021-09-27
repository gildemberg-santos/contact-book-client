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

import EditAddress from './EditAddress';
import DeleteAddress from './DeleteAddress';

library.add(faGlobeAmericas)

class ListAddress extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <tbody>
        {
          this.props.addresses.map((address, index) => {
            return (
              <tr key={address.id}>
                <td className="col-md-10">
                  <p className="info-list">{address.road}, {address.number}, {address.district}, {address.city} - {address.states}, {address.cep}</p>
                </td>
                <td>
                  <EditAddress loadAddresses={this.props.loadAddresses} address={address} contact={this.props.contact} />
                </td>
                <td>
                  <DeleteAddress loadAddresses={this.props.loadAddresses} address={address} contact={this.props.contact} />
                </td>
              </tr>
            );
          }) || <div></div>
        }
      </tbody>
    );
  }
}

export default ListAddress;