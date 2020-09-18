import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import SelectMenu from "../../components/FormElements/Select";
import styles from "./Login.module.css";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyCr0kyqr-_V786T9uAIabmGLRn1YgexG14",
    authDomain: "xcheck-a2bee.firebaseapp.com"
  });
}

class Login extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  public componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user);
    });
  };

  public render() {
    const roleOptions = [
      {label: "Student"},
      {label: "Author"}
    ]
    return (
      <div className={styles.wrap}>
        <div className={styles.wrap_form}>
          <button className={styles.signOut} onClick={() => firebase.auth().signOut()}>Sign out!</button>
          <h2 className={styles.title}>Sing in to XCheck</h2>
          {this.state.isSignedIn ? (
            <span>
            <h3 className={styles.title_role}>Choose your role</h3>
              <>
              <form>
                <SelectMenu menuType={[]} >
                  <option value='roleOptions'>{{roleOptions}}</option>
                </SelectMenu>
              </form>
                </>
          </span>
          ) : (
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          )}
        </div>
        </div>
    );
  }
}

export default Login;
