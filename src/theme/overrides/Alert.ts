import { Palette, PaletteColor, Theme } from "@mui/material";
// import { MdOutlineInfo } from "react-icons/md";

type PaletteKey = keyof {
  [Key in keyof Palette as Palette[Key] extends PaletteColor
    ? Key
    : never]: true;
};

export default function Alert(theme: Theme) {
  const standardStyle = (color: PaletteKey) => ({
    color: theme.palette[color].main,
    backgroundColor: theme.palette[color].light,
    "& .MuiAlert-icon": {
      color: theme.palette[color].main,
    },
  });

  const outlinedStyle = (color: PaletteKey) => ({
    color: theme.palette[color]["main"],
    border: `solid 1px ${theme.palette[color]["main"]}`,
    backgroundColor: theme.palette[color]["light"],
    "& .MuiAlert-icon": {
      color: theme.palette[color]["main"],
    },
  });

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          // info: <MdOutlineInfo />,
          // success: <SuccessIcon />,
          // warning: <WarningIcon />,
          // error: <WarningIcon />,
        },
      },

      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        message: {
          fontWeight: 500,
          "& .MuiAlertTitle-root": {
            marginBottom: theme.spacing(0.5),
          },
        },
        action: {
          "& button:not(:first-of-type)": {
            marginLeft: theme.spacing(1),
          },
        },

        standardInfo: standardStyle("info"),
        standardSuccess: standardStyle("success"),
        standardWarning: standardStyle("warning"),
        standardError: standardStyle("error"),

        outlinedInfo: outlinedStyle("info"),
        outlinedSuccess: outlinedStyle("success"),
        outlinedWarning: outlinedStyle("warning"),
        outlinedError: outlinedStyle("error"),
      },
    },
  };
}
