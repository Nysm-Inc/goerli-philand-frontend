import { extendTheme } from "@chakra-ui/react";
import { colors } from "./color";
import { typographys } from "./typography";

export type ColorMode = "light" | "dark";

export const zIndices = {
  canvas: 0,
  default: 1,
  "search-menulist": 2,
  "canvas-focus": 3,
};

const theme = extendTheme({
  colors: colors,
  textStyles: typographys,
  zIndices: zIndices,
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  boxShadow: {
    none: "none",
    base: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);",
    md: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);",
    lg: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);",
    xl: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);",
    "2xl": "0px 25px 50px -12px rgba(0, 0, 0, 0.25);",
  },
});

export default theme;
