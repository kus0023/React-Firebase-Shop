import React, { Component } from "react";
import fire from "../../firebase-config/fire";
import RenderPayment from "./RenderPayment";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem: null,
      totalPrice: null,
      selectedAddress: null,
    };
    this.payNow = this.payNow.bind(this);
    this.handleSelectedAddr = this.handleSelectedAddr.bind(this);
  }

  payNow() {
    if (this.state.selectedAddress === null || this.state.selectedAddress === "") {
      this.setState({ selectedAddress: null }, () => alert("Choose Address first."));
    } else {
      const order = { id: new Date().getTime(), details: this.state.cartItem, time: new Date().toLocaleString(), address: this.state.selectedAddress };

      //database references
      const db = fire.database().ref();
      const userId = fire.auth().currentUser.uid;
      const cartRef = db.child("shop/cart/" + userId);
      const orderRef = db.child("shop/order/" + userId);
      orderRef.once("value").then((snap) => {
        if (snap.val() !== null) {
          const prev = snap.val();
          prev.push(order);
          orderRef.set(prev).then(() => {
            cartRef.remove();
            this.props.history.push("/order-success");
          });
        } else {
          orderRef.set([order]).then(() => {
            cartRef.remove();
            this.props.history.push("/order-success");
          });
        }
      });
    }
  }

  handleSelectedAddr(e) {
    this.setState({ selectedAddress: e });
  }

  componentDidMount() {
    const userId = fire.auth().currentUser.uid;
    const databaseRef = fire
      .database()
      .ref()
      .child("shop/cart/" + userId);

    databaseRef.on("value", (snap) => {
      const value = snap.val();
      let total = 0;
      if (value != null) {
        value.forEach((v) => (total += v.quantity * v.item.price));
        this.setState({ cartItem: value, totalPrice: total });
      }
    });
  }

  render() {
    return <RenderPayment cart={this.state} clicks={{ handlePayNow: this.payNow, handleSelectedAddr: this.handleSelectedAddr }} />;
  }
}

export default Payment;
