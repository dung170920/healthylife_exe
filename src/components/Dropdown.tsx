import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

type DropdownProps = {
  children: React.ReactNode;
  list: any[];
  sx?: any;
};

export const Dropdown = ({ children, list, sx }: DropdownProps) => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>{children}</ListItemButton>
      {open &&
        list.map((item) => (
          <ListItemButton key={item.name} onClick={() => setOpen(!open)}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText>
              <Typography {...sx}>{item.name}</Typography>
            </ListItemText>
          </ListItemButton>
        ))}
    </>
  );
};
