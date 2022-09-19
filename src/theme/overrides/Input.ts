import { Theme } from "@mui/material";

export default function Input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
          padding: "12px 20px",
          fontWeight: 400,
          borderRadius: "12px",
          border: `2px solid transparent`,
          "&.Mui-disabled": {
            "& svg": { color: theme.palette.grey[700] },
          },
          "&.Mui-focused": {
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          "& .MuiOutlinedInput-notchedOutline, & .Mui-hovered": {
            border: "none",
          },
        },

        input: {
          padding: 0,
          "&::placeholder": {
            opacity: 1,
            color: theme.palette.grey[600],
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
        },
        underline: {
          "&&&:before": {
            borderBottom: "none",
          },
          "&&:after": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[200],
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
          "&.Mui-focused": {
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          "&:before": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderBottom: "none",
          },
          borderRadius: "12px",
        },
      },
    },
  };
}
