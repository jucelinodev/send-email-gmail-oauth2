import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Envio de Email com Gmail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>API para envio de Emails usando Gmail</h1>
    </div>
  );
}
