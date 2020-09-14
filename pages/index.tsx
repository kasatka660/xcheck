import React from "react";
import Layout from "../components/Layout";

const InnerComponent = () => {
  return <div>Test</div>;
};

const Home: React.FC = () => {
  return (
    <Layout>
      <h1>Hello World</h1>
      <div>
        {() => {
          return <div>Test</div>;
        }}
      </div>

      <div>
        <InnerComponent />
      </div>
    </Layout>
  );
};

export default Home;
