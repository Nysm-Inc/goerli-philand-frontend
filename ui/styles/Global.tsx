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
      @font-face {
        font-family: 'PhilsonBlock';
        font-style: normal;
        font-display: swap;
        src: url('/fonts/philson_block.otf');
      }

      ::-moz-selection { /* Code for Firefox */
        color: #8080FF;
        background: rgba(128, 128, 255, 0.2);
      }
      ::selection {
        color: #8080FF;
        background: rgba(128, 128, 255, 0.2);
      }
    `}
  />
);

export default GlobalStyle;
