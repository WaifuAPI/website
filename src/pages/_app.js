// pages/_app.js
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-1733730047414795" />
      </Head>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
