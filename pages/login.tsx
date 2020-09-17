import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import SelectMenu from "../components/FormElements/Select";

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
    return (
      <div className="App">
        <h2>Sing in to XCheck</h2>
        {this.state.isSignedIn ? (
          <span>
            <h4>Welcome to XCheck, {firebase.auth().currentUser.email}</h4>
            <h3>Choose your role</h3>
            <>
            <form>
              <SelectMenu menuType={[]}/>
            </form>
            </>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>

          </span>
        ) : (
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        )}
      </div>

    );
  }
}

export default Login;
