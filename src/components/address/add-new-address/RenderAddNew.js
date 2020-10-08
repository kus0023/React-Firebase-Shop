import React from "react";
import { Accordion, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import fire from "../../../firebase-config/fire";

function RenderAddNew(props) {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="Button" eventKey="0">
            Add new Address
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <Form.Control id="newAdd_pincode" type="number" placeholder="Pincode" />
                </Col>
                <Col>
                  <Form.Control id="newAdd_state" type="text" placeholder="State" />
                </Col>
              </Row>
              <Row className="pt-3 pb-3">
                <Col>
                  <Form.Control id="newAdd_full" type="text" placeholder="Enter Full Address" />
                </Col>
              </Row>

              <Button variant="success" onClick={() => manageSubmit()} className="mt-3">
                Submit
              </Button>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

function manageSubmit() {
  const pincode = document.getElementById("newAdd_pincode").value;
  const state = document.getElementById("newAdd_state").value;
  const fullAddr = document.getElementById("newAdd_full").value;
  const address = { state: state, pincode: pincode, fullAddress: fullAddr };
  putAddress(address);
}

async function putAddress(addr) {
  const userId = fire.auth().currentUser.uid;
  const ref = fire
    .database()
    .ref()
    .child("shop/address/" + userId);
  const dbAddress = await ref.once("value");
  if (dbAddress.val() !== null) {
    let arr = dbAddress.val();

    arr.push(addr);
    ref.set(arr);
  } else {
    ref.set([addr]);
  }
}

export default RenderAddNew;
