import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import AppContextProvider from "~/contexts";
import theme from "~/ui/styles";
import Head from "~/ui/components/Head";
import GlobalStyle from "~/ui/styles/Global";
import usePageview from "~/hooks/ga";
import GoogleAnalytics from "~/ui/components/GA";

const alchemyId = process.env.ALCHEMY_ID;
const { chains, provider } = configureChains([chain.polygonMumbai], [alchemyProvider({ alchemyId })]);
const { connectors } = getDefaultWallets({ appName: "Phi", chains });
const client = createClient({ autoConnect: true, connectors: connectors, provider });

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
              <Component {...pageProps} />
            </ChakraProvider>
          </AppContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
