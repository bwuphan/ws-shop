import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBJFsr_g7sxkWkWsIjcpXsKp9zkiLMiaks",
  authDomain: "message-board-5271a.firebaseapp.com",
  databaseURL: "https://message-board-5271a.firebaseio.com",
  projectId: "message-board-5271a",
  storageBucket: "message-board-5271a.appspot.com",
  messagingSenderId: "115494551486",
  appId: "1:115494551486:web:a074ec1090c179ec"
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