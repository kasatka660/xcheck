import React from "react";
import Layout from "../components/Layout";

const Home: React.FC = () => {
  return (
    <Layout withHeader={true}>
      <h1 style={{ marginTop: "100px", textAlign: "center" }}>
        Welcome to X-Check
      </h1>
    </Layout>
  );
};

export default Home;
