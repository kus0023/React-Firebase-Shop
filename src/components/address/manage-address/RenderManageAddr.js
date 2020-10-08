import React from "react";
import { Button, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import AddNewAddress from "../add-new-address/AddNewAddress";

function RenderManageAddr(props) {
  const list = props.data.addresses !== null ? props.data.addresses : [];
  const element = list.map((item, i) => (
    <ListGroupItem key={i}>
      <Row>
        <Col>
          <p className="display-1">{i + 1}</p>
        </Col>
        <Col>
          <p>{item.fullAddress}</p>
          <p> {item.state} </p>
          <p> {item.pincode} </p>
        </Col>
      </Row>

      <Row className="justify-content-around">
        <Col>
          <Button variant="warning" onClick={() => props.clicks.handleShowModal(i)}>
            Edit
          </Button>
        </Col>
        <Col>
          <Button onClick={() => props.clicks.handleDelete(i)} variant="danger">
            Delete
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  ));
  return (
    <div>
      <AddNewAddress />
      <ListGroup className="mt-4 mb-4">{element}</ListGroup>
    </div>
  );
}
export default RenderManageAddr;
