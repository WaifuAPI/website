import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "tailwind-scrollbar";
import Head from "next/head";
import Script from "next/script";
import ProgressBar from "./components/ProgressBar"; // Import ProgressBar

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-1733730047414795" />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1733730047414795"
        crossOrigin="anonymous"
      ></Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-7CXJQ1G63J"
      ></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-7CXJQ1G63J');
        `}
      </Script>
      <ProgressBar /> {/* Global Progress Bar */}
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
