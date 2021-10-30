import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { StatusCode } from './VerificarStatusCode';

library.add(faEdit)

function EditAddress(props) {
  const [show, setShow] = useState('');
  const [cep, setCep] = useState(props.address.cep);
  const [road, setRoad] = useState(props.address.road);
  const [number, setNumber] = useState(props.address.number);
  const [district, setDistrict] = useState(props.address.district);
  const [city, setCity] = useState(props.address.city);
  const [states, setStates] = useState(props.address.states);


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
    let response = await fetch(`${process.env.REACT_APP_LINK_API}/addresses/${props.address.id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: { cep: cep, road: road, number: number, district: district, city: city, states: states, contact_id: props.contact.id }
        })
      });
    if (StatusCode(response.status)) {
      setShow(false);
      props.loadAddresses(props.contact);
    }
  });

  return (
    <div>
      <span className="btn-icon btn">
        <FontAwesomeIcon onClick={e => setShow(true)} icon={faEdit} size="sm" />
      </span>
      <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Endereço</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Cep" value={cep || ''} onChange={e => setCep(e.target.value)} />
          <Form.Control className="controller_btn" value="Pesquisar Cep" type="button" onClick={searchZipCode} />
          <br />
          <Form.Control type="text" placeholder="Logradouro" value={road || ''} onChange={e => setRoad(e.target.value)} />
          <Form.Control type="text" placeholder="Número" value={number || ''} onChange={e => setNumber(e.target.value)} />
          <Form.Control type="text" placeholder="Bairro" value={district || ''} onChange={e => setDistrict(e.target.value)} />
          <Form.Control type="text" placeholder="Cidade" value={city || ''} onChange={e => setCity(e.target.value)} />
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


export default EditAddress;