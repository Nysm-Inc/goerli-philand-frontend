import { Global } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'JetBrainsMono';
        font-style: normal;
        font-display: swap;
        src: url('/fonts/JetBrainsMono.ttf');
      }
    `}
  />
);

export default GlobalStyle;
