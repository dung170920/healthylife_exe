import { Box, styled } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const MainContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  color: theme.palette.grey[900],
  background: theme.palette.grey[100],
  display: "flex",
}));

export const DashboardLayout = () => {
  return (
    <MainContainer>
      <Sidebar />
      <Box sx={{ flex: 1, pb: 8 }}>
        <Navbar />
        <Outlet />
      </Box>
    </MainContainer>
  );
};
