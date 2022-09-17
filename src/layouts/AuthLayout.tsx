import React from "react";
import { Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Logo from "assets/icons/logo.svg";
import imgSignIn from "assets/icons/imgSignIn.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, styled, Stack } from "@mui/material";
import { AiOutlineCheck } from "react-icons/ai";
const theme = createTheme();

const LeftDiv = styled("div")(({ theme }) => ({
  height: "60%",
  backgroundColor: "#EFEFEF",
  position: "relative",
  width: "100%",
  borderTopLeftRadius: "16px",
  "& .eatClean": {
    position: "absolute",
    right: "30px",
    top: "100px",
  },
}));
const LeftBottomDiv = styled("div")(({ theme }) => ({
  height: "40%",
  backgroundColor: "#EFEFEF",
  position: "relative",
  width: "100%",
  borderBottomLeftRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Div = styled("div")(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "start",
  textTransform: "none",
  "& .icon": {
    marginTop: "5px",
    marginRight: "5px",
  },
}));

const ButtonStyle = styled("div")(({ theme }) => ({
  padding: "6px 12px",
  height: "30px",
  width: "100px",
  borderRadius: "5px",
  border: "2px solid #fff ",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  fontSize: 10,
  backgroundColor: "#FFF",
  color: theme.palette.success.main,
  ":hover": {
    borderWidth: "2px",
  },
}));

export const AuthLayout = () => {
  var urlRoute = window.location.pathname;
  var contentButton = "";
  if (urlRoute === "/auth/login") contentButton = "Đăng ký";
  if (urlRoute === "/auth/register") contentButton = "Đăng nhập";

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        alignItems={"center"}
        sx={{ height: "100vh" }}
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={8} display="flex" sx={{ height: "70vh" }}>
          <Grid item xs={6}>
            <LeftDiv>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: "10px",
                  alignItems: "center",
                }}
              >
                <img src={Logo} alt="" />
                <ButtonStyle> {contentButton}</ButtonStyle>
              </Grid>
              <img src={imgSignIn} alt="" className="eatClean" />
            </LeftDiv>
            <LeftBottomDiv>
              <Stack>
                <Typography variant="h4" color="success.light">
                  Ăn sạch, sống khoẻ
                </Typography>
                <Div>
                  <AiOutlineCheck className="icon" />
                  100+ Công thức Eat Clean
                </Div>

                <Div>
                  {" "}
                  <AiOutlineCheck className="icon" />
                  Theo dõi lộ trình của bạn
                </Div>

                <Div>
                  {" "}
                  <AiOutlineCheck className="icon" />
                  Thiết kế thực đơn phù hợp với bạn
                </Div>
              </Stack>
            </LeftBottomDiv>
          </Grid>
          <Grid item xs={6}>
            <Outlet />
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
};
