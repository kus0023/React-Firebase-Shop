import React, { Component } from "react";
import { Row } from "react-bootstrap";
import fire from "../../../firebase-config/fire";
import ModalForEdit from "./ModalForEdit";
import RenderManageAddr from "./RenderManageAddr";

class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = { addresses: null, modal: { data: null, show: false, index: 0 } };
    this.getAddresses = this.getAddresses.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  getAddresses() {
    const userId = fire.auth().currentUser.uid;
    const databaseRef = fire
      .database()
      .ref()
      .child("shop/address/" + userId);

    databaseRef.on("value", (snap) => {
      const value = snap.val();
      if (value != null) {
        this.setState({ addresses: value, modal: { data: value[0] } });
      } else {
        this.setState({});
      }
    });
  }
  handleDelete(index) {
    const arr = this.state.addresses;
    arr.splice(index, 1);
    const userId = fire.auth().currentUser.uid;
    const databaseRef = fire
      .database()
      .ref()
      .child("shop/address/" + userId);
    databaseRef.set(arr);
  }

  //called from modal
  //return a updated data in parameter
  handleEdit(data, index) {
    let list = this.state.addresses;
    list[index] = data;
    const userId = fire.auth().currentUser.uid;
    const databaseRef = fire
      .database()
      .ref()
      .child("shop/address/" + userId);

    databaseRef.set(list).then(() => this.setState({ modal: { show: false } }));
  }

  //also show the detail of address to fill in the modal to edit.
  //called from RenderManageAddress.js
  handleShowModal(index) {
    let state = this.state;
    state.modal.show = true;
    state.modal.index = index;
    state.modal.data = this.state.addresses[index];
    this.setState(state);
  }

  handleCloseModal() {
    let state = this.state;
    state.modal.show = false;
    this.setState(state);
  }

  componentDidMount() {
    this.getAddresses();
  }
  componentWillUnmount() {
    const userId = fire.auth().currentUser;
    if (userId != null) {
      const databaseRef = fire
        .database()
        .ref()
        .child("shop/address/" + userId.uid);
      databaseRef.off();
    }
  }
  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <RenderManageAddr data={this.state} clicks={{ handleDelete: this.handleDelete, handleShowModal: this.handleShowModal }} />
        </Row>

        <ModalForEdit address={this.state.modal} clicks={{ handleEdit: this.handleEdit, handleClose: this.handleCloseModal }} />
      </div>
    );
  }
}

export default ManageAddress;
