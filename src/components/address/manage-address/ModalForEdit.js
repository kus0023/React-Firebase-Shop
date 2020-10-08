import React from "react";
import { Modal, Button, Col, Container, Form, Row } from "react-bootstrap";

function ModalForEdit(props) {
  if (props.address.data === null || props.address.show === false) {
    return <div></div>;
  }
  return (
    <Modal show={props.address.show} onHide={props.clicks.handleClose} backdrop="static" keyboard={true} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form.Control id="modal_pincode" type="number" placeholder={props.address.data.pincode} />
            </Col>
            <Col>
              <Form.Control id="modal_state" type="text" placeholder={props.address.data.state} />
            </Col>
          </Row>
          <Row className="pt-3 pb-3">
            <Col>
              <Form.Control id="modal_full" type="text" placeholder={props.address.data.fullAddress} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.clicks.handleClose}>
          Close
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            const p = document.getElementById("modal_pincode").value || document.getElementById("modal_pincode").placeholder;
            const s = document.getElementById("modal_state").value || document.getElementById("modal_state").placeholder;
            const full = document.getElementById("modal_full").value || document.getElementById("modal_full").placeholder;
            const address = { state: s, pincode: p, fullAddress: full };

            props.clicks.handleEdit(address, props.address.index);
          }}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForEdit;
