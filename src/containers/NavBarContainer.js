import React from "react";
import MyNav from "../components/nav-bar/MyNav";
import fire from "../firebase-config/fire";

class NavBarContainer extends React.Component {
  logout() {
    fire
      .auth()
      .signOut()
      .then(fire.auth().currentUser.reload())
      .catch((err) => {
        console.error("Error while logout", err);
      });
  }

  render() {
    return (
      <div>
        <MyNav logout={this.logout} itemCountInCart={this.props.count} />
      </div>
    );
  }
}

export default NavBarContainer;
