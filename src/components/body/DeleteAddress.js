import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { StatusCode } from './VerificarStatusCode';

library.add(faTrashAlt)

function DeleteAddress(props) {
    const deleteAddress = (async () => {
        if (window.confirm(`Tem certeza de que deseja excluir: "${props.address.cep}"`)) {
            let response = await fetch(`${process.env.REACT_APP_LINK_API}/addresses/${props.address.id}?address[contact_id]=${0}`, { method: 'DELETE' });
            if (StatusCode(response.status)) {
                props.loadAddresses(props.contact);
            }
        }
    });

    return (
        <div>
            <span className="btn-icon btn" onClick={deleteAddress}>
                <FontAwesomeIcon icon={faTrashAlt} size="sm" />
            </span>
        </div>
    );
}


export default DeleteAddress;