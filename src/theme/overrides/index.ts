import { Theme } from "@mui/material";
import Accordion from "./Accordion";
import Badge from "./Badge";
import CssBaseline from "./CssBaseline";
import Paper from "./Paper";

const Overrides = (theme: Theme) => {
  return Object.assign(
    Accordion(theme),
    Paper(theme),
    CssBaseline(theme),
    Badge()
  );
};

export default Overrides;
