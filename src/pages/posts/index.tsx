import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>12 de março de 2021</time>
            <strong>Create React App</strong>
            <p>lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus </p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Create React App</strong>
            <p>lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus </p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Create React App</strong>
            <p>lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus lorem ipmus </p>
          </a>
        </div>
      </main>

    </>
  )
}