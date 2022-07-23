import { extendTheme } from "@chakra-ui/react";
import { colors } from "./color";
import { typographys } from "./typography";

export type ColorMode = "light" | "dark";

const theme = extendTheme({
  colors: colors,
  textStyles: typographys,
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
});

export default theme;
