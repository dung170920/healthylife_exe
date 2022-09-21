import { Box, styled } from "@mui/material";
import React from "react";

type BowlProps = {
  children: React.ReactNode;
  sx?: Object;
  size: number;
};

const BowlStyle = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  backgroundColor: "white",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.059)",
  border: `1px solid ${theme.palette.grey[100]}`,
}));

export const Bowl = ({ children, sx, size }: BowlProps) => {
  return (
    <BowlStyle sx={{ height: size, width: size, ...sx }}>
      <Box
        sx={{
          height: size - size * 0.1,
          width: size - size * 0.1,
          position: "absolute",
          borderRadius: "inherit",
          opacity: 0.95,
          border: 10,
          borderColor: "grey.100",
        }}
      ></Box>
      <Box
        sx={{
          height: size - size * 0.22,
          width: size - size * 0.22,
          backgroundColor: "white",
          position: "absolute",
          borderRadius: "inherit",
          border: 1,
          borderColor: "grey.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </BowlStyle>
  );
};
