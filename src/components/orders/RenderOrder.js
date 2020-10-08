import React from "react";
import { Accordion, Button, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

function RenderOrder(props) {
  console.log(props.data);
  const orders = props.data.map((order, i) => (
    <Card key={i}>
      <Card.Header>
        <Row>
          <Col>{order.id}</Col>
          <Col>{order.time}</Col>
          <Col>{order.address}</Col>
          <Col>
            <Accordion.Toggle as={Button} variant="link" eventKey={"" + i}>
              Detail
            </Accordion.Toggle>
          </Col>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={"" + i}>
        <Card.Body>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col>Name</Col>
                <Col>Quantity</Col>
                <Col>Price</Col>
              </Row>
            </ListGroupItem>
            {order.details.map((detail, i) => (
              <ListGroupItem key={i}>
                <Row>
                  <Col>{detail.item.name}</Col>
                  <Col>{detail.quantity}</Col>
                  <Col>{detail.item.price}</Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  ));
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Row>
            <Col>Id</Col>
            <Col>Time</Col>
            <Col>Address</Col>
            <Col></Col>
          </Row>
        </Card.Header>
      </Card>
      {orders}
    </Accordion>
  );
}

export default RenderOrder;
