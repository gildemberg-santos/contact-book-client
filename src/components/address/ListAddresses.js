import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import CreateAddress from './create_address/CreateAddresses';
// import CreateAddress from './create_address/CreateAddresses';

class ListAddress extends Component {
  constructor(props) {
    super(props);
  }

  async deleteAddress(address) {
    if (window.confirm(`Tem certeza de que deseja excluir: "${address.cep}"`)) {
      await fetch(`${process.env.REACT_APP_LINK_API}/addresses/${address.id}`, { method: 'DELETE' });
      this.props.loadAddresses();
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
                      Address
                    </p>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    {/* <CreateAddress loadAddresses={this.props.loadAddresses} /> */}
                  </td>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.addresses.map((address, index) => {
                    return <tr key={address.id}>
                      <td className="col-md-10">
                        <p className="title-list">{address.cep}</p>
                      </td>
                      <td>
                        {/* <ViewContact loadContacts={this.props.loadContacts} contact={contact} /> */}
                      </td>
                      <td>
                        {/* <EditContact loadContacts={this.props.loadContacts} contact={contact} /> */}
                      </td>
                      <td>
                        <a className="delete" href="#" onClick={() => this.deleteAddress(address)}>
                          <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                        </a>
                      </td>
                    </tr>;
                  }) || <div></div>
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div >
    );
  }
}

export default ListAddress;