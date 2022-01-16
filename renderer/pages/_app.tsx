import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { CookiesProvider } from "react-cookie";
import TitleBar from "../components/TitleBar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const titleBar = () => {
    if (router.asPath.includes("manualcallback")) return true;
    if (router.asPath.includes("callback")) return false;
    if (router.asPath.includes("howaboutwelogin")) return true;
    if (router.asPath.includes("login")) return false;

    return true;
  };

  return (
    <React.Fragment>
      <CookiesProvider>
        {titleBar() && <TitleBar />}
        <Component {...pageProps} />
      </CookiesProvider>
    </React.Fragment>
  );
}

export default MyApp;
