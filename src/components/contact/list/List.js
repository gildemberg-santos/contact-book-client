import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import EditContact from '.././edit_contact/EditContacts';
import ViewContact from '.././view_contact/ViewContacts';

class List extends Component {
  constructor(props) {
    super(props);
  }

  async deleteContact(contact) {
    if (window.confirm(`Tem certeza de que deseja excluir: "${contact.name}"`)) {
      await fetch(`${process.env.REACT_APP_LINK_API}/contacts/${contact.id}`, { method: 'DELETE' });
      this.props.loadContacts();
    }
  }

  render() {
    return (
      < div >
        <Card>
          <Card.Body>
            <Table responsive>
              <tbody>
                {
                  this.props.contacts.map((contact, index) => {
                    return <tr key={contact.id}>
                      <td className="col-md-10">
                        <p className="contact-name">{contact.name}</p>
                      </td>
                      <td>
                        <ViewContact loadContacts={this.props.loadContacts} contact={contact} />
                      </td>
                      <td>
                        <EditContact loadContacts={this.props.loadContacts} contact={contact} />
                      </td>
                      <td>
                        <a className="delete" href="#" onClick={() => this.deleteContact(contact)}>
                          <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                        </a>
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

export default List;