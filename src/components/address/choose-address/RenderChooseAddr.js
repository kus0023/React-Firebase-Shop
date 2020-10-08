import React from "react";
import { Col, Form } from "react-bootstrap";
import AddNewAddress from "../add-new-address/AddNewAddress";

function RenderChooseAddr(props) {
  if (props.data.addresses === null) {
    return <div>No Address Found</div>;
  }
  let element = props.data.addresses.map((item, i) => (
    <option key={i} value={item.fullAddress + " " + item.state + " " + item.pincode}>
      {item.fullAddress + " " + item.state + " " + item.pincode}
    </option>
  ));

  return (
    <div>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>
          <h1>Choose Address</h1>
        </Form.Label>
        <Form.Control as="select" onChange={(e) => props.clicks.handleCheck(e.target.value)}>
          <option value={null} label="Select Address"></option>
          {element}
        </Form.Control>
      </Form.Group>
      <AddNewAddress />
    </div>
  );
}
export default RenderChooseAddr;
