import { Theme } from "@mui/material";

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 20px",
          borderRadius: 12,
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: "#fff",
          boxShadow: "none",
        },
        containedPrimary: {
          color: "#fff",
          boxShadow: "none",
        },
        // outlined
        outlinedInherit: {
          border: `2px solid ${theme.palette.grey[300]}`,
          color: theme.palette.grey[900],
          backgroundColor: theme.palette.grey[100],
          "&:hover": {
            border: `2px solid ${theme.palette.grey[500]}`,
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
