import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/ui/styles";
import Head from "~/ui/components/Head";
import GlobalStyle from "~/ui/styles/Global";
import AppContextProvider from "~/contexts";
import walletConnect from "~/connectors/walletconnect";
import metamask from "~/connectors/metamask";

const alchemyId = process.env.ALCHEMY_ID;

const { provider } = configureChains([chain.goerli], [alchemyProvider({ alchemyId })]);

const client = createClient({
  autoConnect: true,
  connectors: [metamask, walletConnect],
  provider,
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Head />

      <ChakraProvider theme={theme}>
        <WagmiConfig client={client}>
          <AppContextProvider>
            <Component {...pageProps} />
          </AppContextProvider>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
};

export default App;
