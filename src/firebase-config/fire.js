import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCDLfvfr4tg8JWGFecXUJLTvf2UPAg9XB4",
  authDomain: "fir-5f665.firebaseapp.com",
  databaseURL: "https://fir-5f665.firebaseio.com",
  projectId: "fir-5f665",
  storageBucket: "fir-5f665.appspot.com",
  messagingSenderId: "913146660150",
  appId: "1:913146660150:web:9fc593ac65bf45d1d0df97",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

//this is for demo purpose
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

//Use this in everywhere
export default fire;
