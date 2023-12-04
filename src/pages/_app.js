import Head from "next/head";

import Layout from "@/components/layout";
import { ContextProvider } from "@/store/context";
// import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Layout>
        <Head>
          <title>Kanban Board</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
};

export default App;
