import { Theme } from "@mui/material";

export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            boxShadow: 0,
            borderRadius: theme.shape.borderRadius,
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          "&.Mui-disabled": {
            opacity: 1,
            color: theme.palette.action.disabled,
            "& .MuiTypography-root": {
              color: "inherit",
            },
          },
        },
        expandIconWrapper: {
          color: "inherit",
        },
      },
    },
  };
}
