import { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: 0,
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: 0,
        },
        containedSecondary: {
          boxShadow: 0,
        },
        containedInfo: {
          boxShadow: 0,
        },
        containedSuccess: {
          boxShadow: 0,
        },
        containedWarning: {
          boxShadow: 0,
        },
        containedError: {
          boxShadow: 0,
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[400]}`,
          "&:hover": {
            backgroundColor: theme.palette.background,
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.background,
          },
        },
      },
    },
  };
}
