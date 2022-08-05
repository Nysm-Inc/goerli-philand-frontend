import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import AppContextProvider from "~/contexts";
import { MAINTENANCE } from "~/constants";
import usePageview from "~/hooks/ga";
import theme from "~/ui/styles";
import GlobalStyle from "~/ui/styles/Global";
import Head from "~/ui/components/Head";
import Maintenance from "~/ui/components/Maintenance";
import GoogleAnalytics from "~/ui/components/GA";
import client, { chains } from "~/connectors";

const App = ({ Component, pageProps }: AppProps) => {
  usePageview();

  return (
    <>
      <Head ogp={pageProps.ogp} />
      <GoogleAnalytics />
      <GlobalStyle />

      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <AppContextProvider>
            <ChakraProvider theme={theme}>
              <>{MAINTENANCE === "true" ? <Maintenance /> : <Component {...pageProps} />}</>
            </ChakraProvider>
          </AppContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
