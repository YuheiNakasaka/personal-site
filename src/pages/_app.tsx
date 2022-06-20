import { ChakraProvider } from "@chakra-ui/react";
import * as gtag from "../utils/gtag";
import { useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import Layout from "../layouts/Layout";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

export default function App({ Component, pageProps }: AppProps) {
  if (process.browser) {
    nprogress.start();
  }

  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      console.log(url);
      nprogress.done();
      gtag.pageView(url);
    });
    nprogress.done();

    return () => {
      router.events.off("routeChangeComplete", (url) => {
        gtag.pageView(url);
      });
    };
  }, [router.events]);

  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
