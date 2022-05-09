import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import theme from "~/ui/styles";
import Head from "~/ui/components/Head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global
        styles={`
          @font-face {
            font-family: 'ChiKareGo2';
            font-style: normal;
            font-display: swap;
            src: url('/fonts/ChiKareGo2.ttf');
          }
        `}
      />
      <Head />

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
