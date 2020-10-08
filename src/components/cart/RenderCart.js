import React from "react";
import { ListGroup, Row, Col, Container, Figure, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Render.css";

function RenderCart(props) {
  const totalPrice = props.dataOfItem.totalPrice;
  const list =
    props.dataOfItem.cartItem != null ? (
      props.dataOfItem.cartItem.map((item, i) => (
        <ListGroup.Item key={item.item.id} as="li">
          <Container>
            <Row>
              <Col>{i + 1}</Col>
              <Col>
                <Figure>
                  <Figure.Image src={item.item.img} width="100px" />
                </Figure>
              </Col>
              <Col>{item.item.name}</Col>
              <Col>
                {item.item.price}x{item.quantity} = {item.item.price * item.quantity}
              </Col>
              <Col>
                <div className="qty mt-5">
                  <Button disabled={props.loading} variant="link" onClick={() => props.clicks.handleDecrease(i)}>
                    <span className="minus bg-dark">-</span>
                  </Button>{" "}
                  <input type="number" className="count" name="qty" value={item.quantity} readOnly={true} />
                  <Button disabled={props.loading} variant="link" onClick={() => props.clicks.handleIncrease(i)}>
                    <span className="plus bg-dark">+</span>
                  </Button>
                </div>
              </Col>
              <Col>
                <Button disabled={props.loading} onClick={() => props.clicks.handleDeleteItem(i)} variant="outline-danger">
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
      ))
    ) : (
      <ListGroup.Item></ListGroup.Item>
    );
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          <Container>
            <Row>
              <Col>Se. No.</Col>
              <Col>Image</Col>
              <Col>Name</Col>
              <Col>Price</Col>
              <Col>Quantity</Col>
              <Col>Delete</Col>
            </Row>
          </Container>
        </ListGroup.Item>
        {list}

        <ListGroup.Item>
          <Container>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>Total</Col>
              <Col>{totalPrice}</Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Container>
        </ListGroup.Item>
      </ListGroup>

      <div className="display-2">
        <Link to="/payment" className="btn btn-success m-5 ">
          <h2>Proceed to Pay</h2>
        </Link>
      </div>
    </div>
  );
}

export default RenderCart;
