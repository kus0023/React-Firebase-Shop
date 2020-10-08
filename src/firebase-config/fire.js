import firebase from "firebase";

const firebaseConfig = {
  //Your firebase configurations
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

//this is for demo purpose
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

//Use this in everywhere
export default fire;
