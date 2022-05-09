import { Global } from "@emotion/react";

const GlobalStyle = () => (
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
);

export default GlobalStyle;
