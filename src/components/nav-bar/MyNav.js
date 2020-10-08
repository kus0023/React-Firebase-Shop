import React from "react";
import { Nav, Navbar, NavDropdown, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import fire from "../../firebase-config/fire";
import "./MyNav.css";

function MyNav(props) {
  const user = fire.auth().currentUser;
  const username = user ? user.displayName : "";
  const imgSrc = user ? user.providerData[0].photoURL : "";
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Link id="links" to="/">
        <Navbar.Brand>Shop App</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </Nav>

        <Nav>
          <Image src={imgSrc} width="40px" roundedCircle />
          <NavDropdown title={username} id="basic-nav-dropdown" drop="left">
            <Link to="/orders" className="navbar dropdown-item">
              Orders
            </Link>
            <Link to="manageAddress" className="navbar dropdown-item">
              Address
            </Link>
            <NavDropdown.Divider />

            <Button onClick={props.logout} className="dropdown-item">
              Logout
            </Button>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNav;
