import React from "react";


class Metodos {

  async loadAddress(id_address, id_contact, id_admin) {
    let url = "";
    let addresses = []
    if (id_address != 0) {
      url = `${process.env.REACT_APP_LINK_API}/addresses/${id_address}?address[contact_id]=0&address[admin_id]=0`;
    } else {
      url = `${process.env.REACT_APP_LINK_API}/addresses?address[contact_id]=${id_contact}&address[admin_id]=${id_admin}`;
    }
    try {
      let response = await fetch(url);
      let addresses = await response.json();
    } catch (e) {
      console.log(e);
      addresses = [];
    }
    finally {
      return addresses
    }
  }

  async deleteAddress(id_address, id_contact, id_admin) {
    try {
      await fetch(`${process.env.REACT_APP_LINK_API}/addresses/${id_address}?address[contact_id]=${id_contact}&address[admin_id]=${id_admin}`, { method: 'DELETE' });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteContact(id_contact, id_admin) {
    try {
      await fetch(`${process.env.REACT_APP_LINK_API}/contacts/${id_contact}?contact[admin_id]=${id_admin}`, { method: 'DELETE' });
    } catch (e) {
      console.log(e);
    }
  }
}


export default Metodos;