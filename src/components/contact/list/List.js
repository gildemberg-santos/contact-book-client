import React, { Component } from 'react';
// import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'

class List extends Component {
  async deleteContact(contact) {
    if (window.confirm(`Tem certeza de que deseja excluir: "${contact.name}"`)) {
      // criar logica para deletar contatos
      await fetch(`http://localhost:3001/contacts/${contact.id}`, { method: 'DELETE' });
      this.props.loadContacts();
    }
  }
  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Table responsive>
              <tbody>
                {this.props.contacts.map((contact, index) => {
                  return <tr key={contact.id}>
                    <td className="col-md-10">
                      <p className="contact-name">{contact.name}</p>
                      {/* <p className="contact-info">
                        {contact.cpf}<br />
                        {contact.email}<br />
                        {contact.dateOfBirth}
                      </p> */}
                    </td>
                    <td>
                      <a className="check" href="#">
                        <FontAwesomeIcon icon={faEnvelopeOpenText} size="lg" />
                      </a>
                    </td>
                    <td>
                      <a className="check" href="#">
                        <FontAwesomeIcon icon={faEdit} size="lg" />
                      </a>
                    </td>
                    <td>
                      <a className="delete" href="#" onClick={() => this.deleteContact(contact)}>
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                      </a>
                    </td>

                  </tr>;
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default List;