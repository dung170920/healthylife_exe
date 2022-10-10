import { Theme } from "@mui/material";
import Accordion from "./Accordion";
import Alert from "./Alert";
import Autocomplete from "./Autocomplete";
import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";
import CssBaseline from "./CssBaseline";
import FormControlLabel from "./FormControlLabel";
import Input from "./Input";
import Pagination from "./Pagination";
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
    Input(theme),
    Card(theme),
    Pagination(theme),
    FormControlLabel(theme),
    Alert(theme),
    Autocomplete(theme)
  );
};

export default Overrides;
