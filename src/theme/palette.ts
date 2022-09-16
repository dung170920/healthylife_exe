import { alpha, PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface SimplePaletteColorOptions {
    lighter: string;
  }
}

const palette: PaletteOptions = {
  primary: {
    lighter: alpha("#1AC073", 0.1),
    light: "#92E3A9",
    main: "#1AC073",
  },
  info: {
    lighter: alpha("#0068FF", 0.1),
    light: alpha("#0068FF", 0.2),
    main: "#0068FF",
    dark: "#2F4CDD",
  },
  warning: {
    lighter: alpha("#FFC542", 0.1),
    light: alpha("#FFC542", 0.2),
    main: "#FFC542",
    dark: "#B78103",
  },
  error: {
    lighter: alpha("#FC5A5A", 0.1),
    light: alpha("#FC5A5A", 0.2),
    main: "#FC5A5A",
    dark: "#B72136",
  },
  grey: {
    100: "#FAFAFB",
    200: "#F1F1F5",
    300: "#E2E2EA",
    400: "#D5D5DC",
    500: "#B5B5BE",
    600: "#92929D",
    700: "#696974",
    800: "#44444F",
    900: "#171725",
  },
  background: {
    default: "#FAFAFB",
  },
};

export default palette;
