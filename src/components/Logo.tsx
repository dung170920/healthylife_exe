import { Box, BoxProps } from "@mui/material";
import { LogoIcon } from "assets/icons";
import React from "react";

export const Logo = ({ sx }: BoxProps) => {
  return (
    <Box sx={{ width: 143, height: 81, ...sx }}>
      <LogoIcon />
    </Box>
  );
};
