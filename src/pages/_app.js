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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1733730047414795"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
