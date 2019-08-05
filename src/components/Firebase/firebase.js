import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCq78J6V2e5F11u4rzc1wbHCxBiKDVVCnY",
  authDomain: "ws-shop.firebaseapp.com",
  databaseURL: "https://ws-shop.firebaseio.com",
  projectId: "ws-shop",
  storageBucket: "",
  messagingSenderId: "528331806625",
  appId: "1:528331806625:web:23e9403a17cea18b"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

}


export default Firebase;