import React from "react";
import { Modal, Button, Container, Row, Col, Spinner } from "react-bootstrap";

function ModalForHomeItem(props) {
  const data = props.modalData || {};
  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={true} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{data.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={8}>
              <p>{data.description}</p>
              <small>{data.author}</small>
              <h3>
                &#x20B9;
                {data.price}
              </h3>
            </Col>
            <Col md={4}>
              <img alt={data.name} src={data.img} width="200px" />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" disabled={!props.isLoaded} onClick={props.handleCartAdd}>
          {props.isLoaded ? (
            "Add To Cart"
          ) : (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForHomeItem;
