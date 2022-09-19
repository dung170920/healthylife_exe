import { Theme } from "@mui/material";
import Accordion from "./Accordion";
import Badge from "./Badge";
import Button from "./Button";
import CssBaseline from "./CssBaseline";
import Input from "./Input";
import Paper from "./Paper";
import Popover from "./Popover";

const Overrides = (theme: Theme) => {
  return Object.assign(
    Accordion(theme),
    Paper(theme),
    CssBaseline(theme),
    Badge(),
    Button(theme),
    Popover(theme),
    Input(theme)
  );
};

export default Overrides;
