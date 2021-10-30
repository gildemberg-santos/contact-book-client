import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import CreateContact from './CreateContacts';
import EditContact from './EditContacts';
import Address from './Address';
import { StatusCode } from './VerificarStatusCode';

library.add(faTrashAlt)

class ListContact extends Component {
  constructor(props) {
    super(props);
  }

  async deleteAddress(contact = null) {
    if (window.confirm(`Tem certeza de que deseja excluir: "${contact.name}"`)) {
      try {
        await fetch(`${process.env.REACT_APP_LINK_API}/addresses/0?address[contact_id]=${contact.id}`, { method: 'DELETE' });
      } catch (e) {
        console.log(e);
      }
      finally {
        this.deleteContact(contact);
      }
    }
  }

  async deleteContact(contact) {
    let response = await fetch(`${process.env.REACT_APP_LINK_API}/contacts/${contact.id}`, { method: 'DELETE' });
    if (StatusCode(response.status)) {
      this.props.loadContacts();
    }
  }

  render() {
    return (
      < div >
        <Card>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <td>
                    <p name="top" className="title">
                      Contatos
                    </p>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <CreateContact loadContacts={this.props.loadContacts} />
                  </td>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.contacts.map((contact, index) => {
                    return <tr key={contact.id}>
                      <td className="col-md-10">
                        <p className="title-list">{contact.name}</p>
                        <p className="info-list">
                          CPF: {contact.cpf}<br />
                          E-mail: {contact.email}<br />
                          Data de Nascimento: {contact.dateOfBirth}
                        </p>
                      </td>
                      <td>
                        <Address contact={contact} />
                      </td>
                      <td>
                        <EditContact loadContacts={this.props.loadContacts} contact={contact} />
                      </td>
                      <td>
                        <span className="btn-icon btn" onClick={() => this.deleteAddress(contact)}>
                          <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                        </span>
                      </td>
                    </tr>;
                  }) || <div></div>}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div >
    );
  }
}

export default ListContact;