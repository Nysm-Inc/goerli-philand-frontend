import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/ui/styles";
import Head from "~/ui/components/Head";
import GlobalStyle from "~/ui/styles/Global";
import AppContextProvider from "~/contexts";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Head />

      <ChakraProvider theme={theme}>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
