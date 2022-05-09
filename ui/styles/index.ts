import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      high: "rgba(128, 128, 255, 1)", // #8080FF
      medium: "rgba(128, 128, 255, 0.72)",
      low: "rgba(128, 128, 255, 0.24)",
    },
    surface: {
      high: "rgba(23, 23, 23, 1)", // #171717
      medium: "rgba(23, 23, 23, 0.64)",
      low: "rgba(23, 23, 23, 0.32)",
      disabled: "rgba(23, 23, 23, 0.08)",
    },
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  fonts: {
    body: "ChiKareGo2",
  },
  textStyles: {
    "display-lg": {
      fontSize: "57px",
      lineHeight: "64px",
    },
    "display-md": {
      fontSize: "45px",
      lineHeight: "52px",
    },
    "display-sm": {
      fontSize: "36px",
      lineHeight: "44px",
    },
    "headline-lg": {
      fontSize: "32px",
      lineHeight: "40px",
    },
    "headline-md": {
      fontSize: "28px",
      lineHeight: "36px",
    },
    "headline-sm": {
      fontSize: "24px",
      lineHeight: "32px",
    },
    "title-lg": {
      fontSize: "22px",
      lineHeight: "28px",
    },
    "title-md": {
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    "title-sm": {
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
    "label-lg": {
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
    "label-md": {
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0.5px",
    },
    "label-sm": {
      fontSize: "11px",
      lineHeight: "16px",
      letterSpacing: "0.5px",
    },
    "body-lg": {
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    "body-md": {
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.25px",
    },
    "body-sm": {
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0.4px",
    },
  },
});

export default theme;
