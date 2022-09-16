import { styled } from "@mui/material";
import { Sidebar } from "components";
import { Outlet } from "react-router-dom";

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
      <div>
        <Outlet />
      </div>
    </MainContainer>
  );
};
