import { Box, styled } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import React from "react";
import { Scrollbar } from "components";

const MainContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  color: theme.palette.grey[900],
  background: theme.palette.background.default,
  display: "flex",
  overflow: "hidden",
}));

export const DashboardLayout = () => {
  return (
    <MainContainer>
      <Sidebar />
      <Box sx={{ flex: 1, pb: 8 }}>
        <Navbar />
        <Scrollbar sx={{ height: 1, px: 5, pt: 6, pb: 18 }}>
          <Outlet />
        </Scrollbar>
      </Box>
    </MainContainer>
  );
};
