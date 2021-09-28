import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { StatusCode } from './VerificarStatusCode';

library.add(faPlusCircle)

function CreateAddress(props) {
    const [show, setShow] = useState('');
    const [cep, setCep] = useState('');
    const [road, setRoad] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');

    const searchZipCode = (async () => {
        let address = {};
        let response = null;
        try {
            response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            address = await response.json();
        } catch (e) {
            console.log(e);
        }
        finally {
            if (response != null && response.status == 200) {
                setCep(address['cep']);
                setRoad(address['logradouro']);
                setNumber('');
                setDistrict(address['bairro']);
                setCity(address['localidade']);
                setStates(address['uf']);
            }
            else {
                alert(`O cep ${cep} é inválido!`)
            }
        }
    });

    const handleSubmit = (async () => {
        let response = await fetch(`${process.env.REACT_APP_LINK_API}/addresses`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address: { cep: cep, road: road, number: number, district: district, city: city, states: states, contact_id: props.contact.id, admin_id: 1 }
                })
            });
        if (StatusCode(response.status)) {
            setShow(false);
            setCep('');
            setRoad('');
            setNumber('');
            setDistrict('');
            setCity('');
            setStates('');
            props.loadAddresses(props.contact);
        }
    });

    return (
        <div>
            <a className="btn-icon" href="#">
                <FontAwesomeIcon onClick={e => setShow(true)} icon={faPlusCircle} size="sm" />
            </a>
            <Modal show={show || false} onHide={e => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Endereço</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" autoComplete placeholder="Cep" value={cep || ''} onChange={e => setCep(e.target.value)} />
                    <Form.Control className="controller_btn" value="Pesquisar CEP" type="button" onClick={searchZipCode} />
                    <br />
                    <Form.Control type="text" autoComplete placeholder="Logradouro" value={road || ''} onChange={e => setRoad(e.target.value)} />
                    <Form.Control type="text" autoComplete placeholder="Número" value={number || ''} onChange={e => setNumber(e.target.value)} />
                    <Form.Control type="text" autoComplete placeholder="Bairro" value={district || ''} onChange={e => setDistrict(e.target.value)} />
                    <Form.Control type="text" autoComplete placeholder="Cidade" value={city || ''} onChange={e => setCity(e.target.value)} />
                    <select className="form-control" value={states || ''} onChange={e => setStates(e.target.value)}>
                        <option value="">Selecionar o Estado</option>
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
                    <Button className="btn-cancelar" onClick={e => setShow(false)}>
                        Cancelar
                    </Button>
                    <Form onSubmit={handleSubmit}>
                        <Button className="btn-salvar" type="submit">
                            Salvar
                        </Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


export default CreateAddress;