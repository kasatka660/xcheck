import React from "react";
import Layout from "../components/Layout";
import SelectMenu from "../components/FormElements/Select/index";
import { task, user } from "../data/data";

const Home: React.FC = () => {
  return (
    <Layout>
      <h1>Hello World</h1>
      <SelectMenu menuType={task.id}></SelectMenu>
      <SelectMenu menuType={user.roles}></SelectMenu>
    </Layout>
  );
};

export default Home;
