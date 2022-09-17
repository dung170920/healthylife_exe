import { Box } from "@mui/material";
import React from "react";

export const ErrorBoundary = ({ error }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        color: "theme.error.main",
        justifyContent: "center",
        alignItems: "center",
        p: 5,
        bgcolor: "theme.error.light",
      }}
    >
      <h2>Oops, something went wrong</h2>
      <h4>{error.message}</h4>
    </Box>
  );
};
