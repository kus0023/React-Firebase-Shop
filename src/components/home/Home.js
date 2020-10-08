import React from "react";
import fire from "../../firebase-config/fire";
import "./Home.css";
import ModalForHomeItem from "./ModalForHomeItem";
import RenderHome from "./RenderHome";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      showModal: false,
      modalData: null,
      isSuccessfullyAdded: true,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCartAdd = this.handleCartAdd.bind(this);
  }

  handleItemClick(data) {
    this.setState({ showModal: true, modalData: data });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleCartAdd() {
    this.setState({ isSuccessfullyAdded: false });
    const currentUserId = fire.auth().currentUser.uid;
    const databaseRef = fire.database().ref("shop").child("cart").child(currentUserId);
    databaseRef
      .once("value")
      .then((snap) => {
        let currentItem = this.state.modalData;
        if (snap.val() != null) {
          const v = snap.val();
          const itemIsPresent = v.some((item) => item.item.id === currentItem.id);
          if (itemIsPresent) {
            let newArray = v.map((e) => {
              if (e.item.id === currentItem.id) {
                e.quantity = e.quantity + 1;
              }
              return e;
            });
            databaseRef.set(newArray, (onComplete) => {
              this.setState({ isSuccessfullyAdded: true });
            });
          } else {
            let pushItem = { quantity: 1, item: this.state.modalData, time: new Date().toLocaleString() };
            v.push(pushItem);
            databaseRef.set(v, (onComplete) => {
              this.setState({ isSuccessfullyAdded: true });
            });
          }
        } else {
          let pushItem = { quantity: 1, item: this.state.modalData, time: new Date().toLocaleString() };
          const array = [pushItem];
          databaseRef.set(array, (onComplete) => {
            this.setState({ isSuccessfullyAdded: true });
          });
        }
      })
      .catch((err) => {
        console.log(err);

        this.setState({ isSuccessfullyAdded: true });
      });
  }

  componentDidMount() {
    const ref = fire.database().ref("shop").child("products");
    ref.on("value", (snap) => {
      this.setState({ data: snap.val() });
    });
  }

  componentWillUnmount() {
    const ref = fire.database().ref("shop").child("products");
    ref.off();
  }

  render() {
    return (
      <div>
        <RenderHome handleItemClick={this.handleItemClick} dataOfItem={this.state.data} />
        <ModalForHomeItem show={this.state.showModal} isLoaded={this.state.isSuccessfullyAdded} handleClose={this.handleCloseModal} modalData={this.state.modalData} handleCartAdd={this.handleCartAdd} />
      </div>
    );
  }
}

export default Home;
