import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Header } from '../components/Header/index';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header />
      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
