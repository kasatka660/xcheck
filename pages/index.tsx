import React from "react";
import Layout from "../components/Layout";
import Authorization from "../components/Authorization";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (!window.localStorage.getItem("user")) {
      return (
        <Layout withHeader={false}>
          <h1 style={{ marginTop: "100px", textAlign: "center" }}>
            Welcome to X-Check
          </h1>
          <Authorization />
        </Layout>
      );
    } else {
      return (
        <Layout withHeader={true}>
          <h1 style={{ marginTop: "100px", textAlign: "center" }}>
            Welcome to X-Check
          </h1>
        </Layout>
      );
    }
  }
  return <></>;
};

export default Home;
