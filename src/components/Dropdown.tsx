import { Popover } from "@mui/material";
import React from "react";

type DropdownProps = {
  onClose: () => void;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  children: React.ReactNode;
  sx?: Object;
};

export const Dropdown = ({ children, sx, ...props }: DropdownProps) => {
  return (
    <Popover
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: "inherit",
          ...sx,
        },
      }}
      {...props}
    >
      {children}
    </Popover>
  );
};
