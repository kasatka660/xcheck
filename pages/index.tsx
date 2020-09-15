import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Header } from '../components/Header/index';
import React from "react";
import Layout from "../components/Layout";
import SelectMenu from "../components/FormElements/Select/index";
import { task, user } from "../data/data";

const Home: React.FC = () => {
  return (

    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header />
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
    
    <Layout>
      <h1>Hello World</h1>
      <SelectMenu menuType={task.id}></SelectMenu>
      <SelectMenu menuType={user.roles}></SelectMenu>
    </Layout>
    </div>
  );
};

export default Home;
