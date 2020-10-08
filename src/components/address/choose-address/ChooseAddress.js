import React, { Component } from "react";
import RenderChooseAddr from "./RenderChooseAddr";
import fire from "../../../firebase-config/fire";

class ChooseAddress extends Component {
  constructor(props) {
    super(props);
    this.state = { addresses: null };
    this.handleCheck = this.handleCheck.bind(this);
  }
  getAddresses() {
    const userId = fire.auth().currentUser.uid;
    const databaseRef = fire
      .database()
      .ref()
      .child("shop/address/" + userId);

    databaseRef.on("value", (snap) => {
      const value = snap.val();
      if (value != null) {
        this.setState({ addresses: value });
      }
    });
  }
  handleCheck(e) {
    this.props.selectedData(e);
  }

  componentDidMount() {
    this.getAddresses();
  }
  componentWillUnmount() {
    const userId = fire.auth().currentUser;
    if (userId != null) {
      const databaseRef = fire
        .database()
        .ref()
        .child("shop/address/" + userId.uid);
      databaseRef.off();
    }
  }
  render() {
    return <RenderChooseAddr data={this.state} clicks={{ handleCheck: this.handleCheck }} />;
  }
}

export default ChooseAddress;
