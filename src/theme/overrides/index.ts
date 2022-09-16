import { Theme } from "@mui/material";
import Accordion from "./Accordion";
import Paper from "./Paper";

const Overrides = (theme: Theme) => {
  return Object.assign(Accordion(theme), Paper(theme));
};

export default Overrides;
