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

export const themeFonts = {
  headline: {
    fontFamily: "PhilsonBlock",
    fontWeight: 400,
    fontSize: "32px",
    lineHeight: "48px",
    textShadow: "-2px 4px 8px rgba(13, 13, 13, 0.1)",
    "-webkit-text-stroke": "1px #1A1A1A",
  },
  "headline-1": {
    fontFamily: "JetBrains Mono",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.02em",
  },
  "headline-2": {
    fontFamily: "JetBrains Mono",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "-0.02em",
  },
  "headline-3": {
    fontFamily: "JetBrains Mono",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.02em",
  },
  "paragraph-1": {
    fontFamily: "JetBrains Mono",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "-0.02em",
  },
  "paragraph-2": {
    fontFamily: "JetBrains Mono",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.02em",
    fontFeatureSettings: "'liga' off",
  },
  "paragraph-3": {
    fontFamily: "JetBrains Mono",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "-0.02em",
    fontFeatureSettings: "'liga' off",
  },
  "button-1": {
    fontFamily: "PhilsonBlock",
    fontWeight: 400,
    fontSize: "16px",
    fontFeatureSettings: "'ss01' on, 'liga' off",
    textShadow: "3px 3px 0px rgba(13, 13, 13, 0.1)",
    "-webkit-text-stroke": "1px #1A1A1A",
  },
  "button-2": {
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "-0.02em",
  },
  "label-1": {
    fontFamily: "JetBrains Mono",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.02em",
  },
  "label-2": {
    fontFamily: "JetBrains Mono",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "-0.02em",
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
  textStyles: themeFonts,
});

export default theme;
