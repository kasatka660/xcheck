import React from "react";
import Layout from "../components/Layout";
import { Header } from "../components/Header";

const Home: React.FC = () => {
  return (
    <Layout>
      <Header />
      <h1>Hello World</h1>
    </Layout>
  );
};

export default Home;
