import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Provider as NextAuthProvier } from "next-auth/client";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvier session={pageProps.sesion}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvier>
  )
}

export default MyApp;
