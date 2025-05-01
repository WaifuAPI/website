import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "tailwind-scrollbar";
import Head from "next/head";
import Script from "next/script";
import ProgressBar from "../components/ui/ProgressBar"; // Import ProgressBar
import RequireDiscordOAuth from "@/components/auth/RequireDiscordOAuth";
import { useRouter } from "next/router";
import { WebSocketProvider } from "@/components/hooks/WebsocketProvider"; // Import WebSocketProvider

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboardPage = router.pathname.startsWith("/dashboard");

  useEffect(() => {
    const warningTitleCSS =
      "color:red; font-size:60px; font-weight: bold; -webkit-text-stroke: 1px black;";
    const warningDescCSS = "font-size: 18px;";

    console.log("%cStop!", warningTitleCSS);
    console.log(
      '%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a API feature or "hack" someone\'s account, it is a scam and will give them access to your Waifu.it or Discord account.',
      warningDescCSS
    );
    console.log(
      "%cSee https://en.wikipedia.org/wiki/Self-XSS for more information.",
      warningDescCSS
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        {" "}
        {/* ✅ Wrap the entire app */}
        <Head>
          <meta
            name="google-adsense-account"
            content="ca-pub-1733730047414795"
          />
          <meta name="theme-color" content="#1E293BE6" />
        </Head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1733730047414795"
          crossOrigin="anonymous"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7CXJQ1G63J"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || []; 
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date()); 
            gtag('config', 'G-7CXJQ1G63J');
          `}
        </Script>
        <ProgressBar />
        {isDashboardPage ? (
          <RequireDiscordOAuth>
            <Component {...pageProps} />
          </RequireDiscordOAuth>
        ) : (
          <Component {...pageProps} />
        )}
        <ReactQueryDevtools />
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
