import React, { ReactNode } from "react";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import breakpoints from "./breakpoints";
import palette from "./palette";
import Overrides from "./overrides";
import { CssBaseline } from "@mui/material";

type ThemeConfigProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeConfigProps) => {
  const themeOptions: ThemeOptions = {
    palette,
    breakpoints,
  };

  const theme = createTheme(themeOptions);
  //theme.components = Overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
