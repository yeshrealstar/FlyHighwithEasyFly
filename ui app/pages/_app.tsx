import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Connector from "@/context/wallet";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Connector>
      <Component {...pageProps} />
    </Connector>
  );
}
