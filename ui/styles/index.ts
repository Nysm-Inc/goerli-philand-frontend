import { extendTheme } from "@chakra-ui/react";

export type ColorMode = "light" | "dark";

export const themeColors = {
  purple: {
    350: "#6767E4",
    250: "#8080FF",
    150: "#B2B2FF",
  },
  violet: {
    350: "#BA67E4",
    250: "#0480FF",
    150: "#E582FF",
  },
  orange: {
    350: "#E49967",
    250: "#FF8380",
    150: "#FFF7B2",
  },
  yellow: {
    350: "#E40867",
    250: "#FFF280",
    150: "#FFE299",
  },
  green: {
    350: "#14B881",
    250: "#17CE92",
    150: "#70DBB8",
  },
  red: {
    350: "#E54D4D",
    250: "#FF6666",
    150: "#FF8080",
  },
  grey: {
    350: "#1A1A1A",
    250: "#808080",
    150: "#CCCCCC",
  },

  // todo
  // [colorMode][800]
  light: {
    350: "#CECCC9",
    250: "#F5F2EB",
    150: "#FBF9F5",
  },
  dark: {
    350: "#292929",
    250: "#333333",
    150: "#B3B3B3",
  },
  black: {
    350: "#000000",
    250: "#1A1A1A",
    150: "#1A1A1A",
  },
  white: {
    350: "#FFFFFF",
    250: "#FFFFFF",
    150: "#FFFFFF",
  },
};

const theme = extendTheme({
  colors: themeColors,
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  fonts: {
    body: "JetBrainsMono",
    color: "#1A1A1A",
  },
  textStyles: {
    "button-2": {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: "-0.02em",
    },
  },
});

export default theme;
