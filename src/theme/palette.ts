import { alpha, PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

const palette: PaletteOptions = {
  primary: {
    lighter: alpha("#6346FA", 0.1),
    light: "#CABDFF",
    main: "#6346FA",
    dark: "#623CE7",
    darker: alpha("#ECEAFE", 0.08),
  },
  info: {
    lighter: alpha("#0068FF", 0.2),
    light: "#74CAFF",
    main: "#0068FF",
    dark: "#0C53B7",
    darker: "#04297A",
  },
  success: {
    lighter: alpha("#54D62C", 0.2),
    light: "#AAF27F",
    main: "#54D62C",
    dark: "#229A16",
    darker: "#08660D",
  },
  warning: {
    lighter: alpha("#FFC107", 0.2),
    light: "#FFE16A",
    main: "#FFC107",
    dark: "#B78103",
    darker: "#7A4F01",
  },
  error: {
    lighter: alpha("#FF4842", 0.2),
    light: "#FFBC99",
    main: "#FF4842",
    dark: "#B72136",
    darker: alpha("#FFE7D9", 0.08),
  },
  neutral: {
    100: "#F4F5F6",
    200: "#FBFBFB",
    300: "#EFEFEF",
    400: "#E7E7E8",
    500: "#9A9FA5",
    600: "#84878B",
    700: "#6F767E",
    800: "#2E2E30",
    900: "#1A1D1F",
  },
  background: {
    default: "#EFEFEF",
  },
};

export default palette;
