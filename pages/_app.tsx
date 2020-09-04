import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { reduxWrapper } from "../redux/store";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default reduxWrapper.withRedux(MyApp);
