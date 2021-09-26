import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import ListAddress from './list_address/ListAddresses';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        };
        this.loadAddresses = this.loadAddresses.bind(this);
    }

    async loadAddresses() {
        let response = await fetch(`${process.env.REACT_APP_LINK_API}/addresses?address[contact_id]=${this.props.contact.id}&address[admin_id]=${1}`);
        const addresses = await response.json();
        this.setState({ addresses: addresses });
    }

    componentDidMount() {
        this.loadAddresses();
    }
    render() {
        return (
            <Row>
                <Col className="list">
                    {/* <ListAddress loadAddresses={this.loadAddresses} addresses={this.state.addresses} contact={this.props.contact} /> */}
                </Col>
            </Row >
        );
    }
}

export default Address;