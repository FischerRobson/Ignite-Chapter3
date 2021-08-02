import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const respose = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['plublication.title', 'publication.content'],
    pageSize: 100
  });

  console.log(respose)

  return {
    props: {

    }
  }

}