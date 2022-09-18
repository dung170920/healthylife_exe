import { styled } from "@mui/material";
import React from "react";
import SimpleBarReact from "simplebar-react";

type ScrollbarProps = {
  children: React.ReactNode;
  sx: Object;
};

const RootStyle = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: theme.palette.grey[400],
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
}));

export const Scrollbar = ({ children, sx, ...props }: ScrollbarProps) => {
  return (
    <RootStyle>
      <SimpleBarStyle sx={sx} {...props}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
};
