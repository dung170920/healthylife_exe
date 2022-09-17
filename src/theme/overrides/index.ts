import { Theme } from "@mui/material";
import Accordion from "./Accordion";
import Badge from "./Badge";
import Button from "./Button";
import CssBaseline from "./CssBaseline";
import Paper from "./Paper";

const Overrides = (theme: Theme) => {
  return Object.assign(
    Accordion(theme),
    Paper(theme),
    CssBaseline(theme),
    Badge(),
    Button(theme)
  );
};

export default Overrides;
