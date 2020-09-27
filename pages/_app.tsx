import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { reduxWrapper } from "../redux/store";
import "antd/dist/antd.css";
import firebase from "firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyCr0kyqr-_V786T9uAIabmGLRn1YgexG14",
    authDomain: "xcheck-a2bee.firebaseapp.com",
  });
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default reduxWrapper.withRedux(MyApp);
