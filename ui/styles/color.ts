export const main = {
  primary: {
    // old
    600: "#6767E4",
    500: "#8080FF",
    300: "#B2B2FF",

    // new
    70: "#A2A2FF",
    60: "#8283FF",
    50: "#6868E5",
  },
  grey: {
    900: "#1A1A1A",
    500: "#808080",
    200: "#CCCCCC",
    100: "#EEEEEE",
  },
  warmgrey: {
    20: "#1C1B1B",
    40: "#383736",
    50: "#595959",
    60: "#99968F",
    70: "#D0CCC3",
    80: "#E9E5DD",
    90: "#F6F3ED",
    95: "#FBF9F5",
  },
  white: "#FFFFFF",
};

export const lightDark = {
  light: {
    g_orange: "#CECCC9",
    lg_orange40: "#F5F2EB",
    lg_orange30: "#FBF9F5",
  },
  dark: {
    black: "#0D0D0D",
    grey800: "#292929",
    grey700: "#333333",
    grey600: "#595959",
    grey300: "#B3B3B3",
  },
};

export const information = {
  info: {
    default: "#0086F0", // rgba(0, 134, 240, 1)
    muted: "rgba(0, 134, 240, 0.48)",
    subtle: "rgba(0, 134, 240, 0.16)",
  },
  success: {
    default: "#14B881", // rgba(20, 184, 129, 1)
    muted: "rgba(20, 184, 129, 0.48)",
    subtle: "rgba(20, 184, 129, 0.16)",
  },
  warning: {
    default: "#FFC328", // rgba(255, 195, 40, 1)
    muted: "rgba(255, 195, 40, 0.48)",
    subtle: "rgba(255, 195, 40, 0.16)",
  },
  danger: {
    default: "#EF4444", // rgba(239, 68, 68, 1)
    muted: "rgba(239, 68, 68, 0.48)",
    subtle: "rgba(239, 68, 68, 0.16)",
  },
};

export const subColors = {
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
    350: "#F5C13D",
    250: "#FFD466",
    150: "#FFE299",
  },
  green: {
    350: "#14B881",
    250: "#33CC99",
    150: "#70DBB8",
  },
  red: {
    350: "#E54D4D",
    250: "#FF6666",
    150: "#FF8080",
  },
};

export const colors = { ...main, ...lightDark, ...information, ...subColors };
