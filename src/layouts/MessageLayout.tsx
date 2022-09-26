import { Box, styled } from "@mui/material";
import { Logo } from "components";
import { error } from "assets/images";
import { Link, Outlet } from "react-router-dom";

const ContainerStyle = styled(Box)({
  position: "relative",
  height: "100vh",
  width: "100%",
  overflow: "hidden",

  img: {
    position: "absolute",
    left: "24px",
    bottom: "24px",
    width: "540px",
  },
});

const MessageLayout = () => {
  return (
    <ContainerStyle>
      <img src={error} alt="" />
      <Link to="/">
        <Logo sx={{ margin: "54px auto" }} />
      </Link>
      <Outlet />
    </ContainerStyle>
  );
};

export default MessageLayout;
