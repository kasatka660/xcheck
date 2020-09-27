import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { reduxWrapper } from "../redux/store";
import "antd/dist/antd.css";
import firebase from "firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyBqXOuTuDaMIqT5eSKeEg8d7mP_kaPSa3U",
    authDomain: "x-check-93bcd.firebaseapp.com",
  });
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default reduxWrapper.withRedux(MyApp);
