import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { reduxWrapper } from "../redux/store";
import "antd/dist/antd.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default reduxWrapper.withRedux(MyApp);
