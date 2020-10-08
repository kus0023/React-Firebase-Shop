import React from "react";
import NavBarContainer from "./NavBarContainer";
import Home from "../components/home/Home";
import Cart from "../components/cart/Cart";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Payment from "../components/payment/Payment";
import ManageAddress from "../components/address/manage-address/ManageAddress";
import Thanks from "../components/ordered-successfull/Thanks";
import Orders from "../components/orders/Orders";

class HomeContainer extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBarContainer />
        <div style={{ marginTop: "60px" }}></div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/manageAddress" component={ManageAddress} exact />
          <Route path="/payment" component={Payment} exact />
          <Route path="/order-success" component={Thanks} exact />
          <Route path="/orders" component={Orders} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default HomeContainer;
