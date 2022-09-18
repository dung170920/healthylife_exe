import { Stack, styled, Typography } from "@mui/material";
import React from "react";

const ErrorBoundaryStyle = styled(Stack)(({ theme }) => ({
  color: theme.palette.error.main,
  justifyContent: "center",
  alignItems: "center",
  padding: "5rem",
  backgroundColor: theme.palette.error.lighter,
}));

export const ErrorBoundary = ({ error }: any) => {
  return (
    <ErrorBoundaryStyle>
      <h2>Oops, something went wrong</h2>
      <Typography textAlign={"center"}>{error.message}</Typography>
    </ErrorBoundaryStyle>
  );
};
