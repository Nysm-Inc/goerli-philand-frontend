import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/ui/styles";
import Head from "~/ui/components/Head";
import GlobalStyle from "~/ui/styles/Global";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Head />

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
