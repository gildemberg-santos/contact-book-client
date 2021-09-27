import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';

library.add(faPlusCircle)

class CreateAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            cep: '',
            road: '',
            number: '',
            district: '',
            city: '',
            states: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fechar() {
        this.setState({
            show: true
        });
        console.log(this.state.show);
        window.alert(this.state.show);
    }

    async handleSubmit() {
        await fetch(`${process.env.REACT_APP_LINK_API}/addresses`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address: { cep: this.state.cep, road: this.state.road, number: this.state.number, district: this.state.district, city: this.state.city, states: this.state.states, contact_id: this.props.contact.id, admin_id: 1 }
                })
            });
        this.setState({
            show: false,
            cep: '',
            road: '',
            number: '',
            district: '',
            city: '',
            states: ''
        });
        this.props.loadAddresses(this.props.contact);
    }

    // componentDidMount() {
    //     this.handleSubmit();
    // }

    render() {
        return (
            <div>
                <a className="btn-icon" href="#">
                    <FontAwesomeIcon onClick={e => this.setState({ show: true })} icon={faPlusCircle} size="lg" />
                </a>

                <Modal id="cineshow" show={this.state.show || false} onHide={() => this.setState({ show: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Addreess</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control type="text" autoComplete placeholder="CEP" value={this.state.cep || ''} onChange={e => this.setState({ cep: e.target.value })} />
                        <Form.Control type="text" autoComplete placeholder="Road" value={this.state.road || ''} onChange={e => this.setState({ road: e.target.value })} />
                        <Form.Control type="text" autoComplete placeholder="Númber" value={this.state.number || ''} onChange={e => this.setState({ number: e.target.value })} />
                        <Form.Control type="text" autoComplete placeholder="Distrinct" value={this.state.district || ''} onChange={e => this.setState({ district: e.target.value })} />
                        <Form.Control type="text" autoComplete placeholder="City" value={this.state.city || ''} onChange={e => this.setState({ city: e.target.value })} />
                        {/* <Form.Control type="text" autoComplete placeholder="States" value={this.state.states || ''} onChange={e => this.setState({ states: e.target.value })} /> */}
                        <select value={this.state.states || ''} onChange={e => this.setState({ states: e.target.value })}>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                            <option value="EX">Estrangeiro</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form onSubmit={() => this.handleSubmit()}>
                            <Button className="btn-salvar" type="submit">
                                Create
                            </Button>
                        </Form>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}

export default CreateAddress;