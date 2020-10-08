import React from "react";
import {} from "react-bootstrap";
import { Link } from "react-router-dom";

function Thanks() {
  return (
    <div>
      <h1>Great! Thankyou for shoping with us. Hope you enjoyed.</h1>
      <Link to="/orders" className="button btn btn-success">
        View Orders
      </Link>
    </div>
  );
}

export default Thanks;
