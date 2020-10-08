import React from "react";
import { ListGroup, Row, Col, Container, Figure } from "react-bootstrap";

function RenderHome(props) {
  const list =
    props.dataOfItem != null ? (
      props.dataOfItem.map((item, i) => (
        <ListGroup.Item action key={item.id} as="li" onClick={() => props.handleItemClick(item)}>
          <Container>
            <Row>
              <Col>{i + 1}</Col>
              <Col>
                <Figure>
                  <Figure.Image src={item.img} />
                </Figure>
              </Col>
              <Col>{item.name}</Col>
              <Col>{item.price}</Col>
              <Col>{item.author}</Col>
              <Col>{item.type}</Col>
              <Col>{item.category}</Col>
            </Row>
          </Container>
        </ListGroup.Item>
      ))
    ) : (
      <ListGroup.Item></ListGroup.Item>
    );
  return (
    <ListGroup>
      <ListGroup.Item>
        <Container>
          <Row>
            <Col>Se.No.</Col>
            <Col>Image</Col>
            <Col>Name</Col>
            <Col>Price</Col>
            <Col>Author</Col>
            <Col>Type</Col>
            <Col>Category</Col>
          </Row>
        </Container>
      </ListGroup.Item>
      {list}
    </ListGroup>
  );
}

export default RenderHome;
