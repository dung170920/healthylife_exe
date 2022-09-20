import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, styled, Alert } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "config/config";
import { useDispatch, useSelector } from "react-redux";
import { authPending, loginFail, loginSuccess } from "redux/slices/AuthSlice";
//import { postIdToken } from "services/AuthService";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postIdToken } from "api/AuthApi";

const theme = createTheme();
const DivContainner = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

const DivHeader = styled("div")(({ theme }) => ({
  width: "100%",
  height: "15%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
}));

const DivDangNhap = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  marginLeft: "20px",
  marginTop: "15px",
  fontSize: "150%",
  fontWeight: "600",
}));

const DivForm = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  marginLeft: "20px",
  fontSize: "110%",
}));

const DivContent = styled("div")(({ theme }) => ({
  width: "100%",
  height: "85%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
}));

const ButtonLogin = styled(Button)(({ theme }) => ({
  padding: "6px 16px",
  height: "36px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid ",
  backgroundColor: "#1AC073",
  color: "#FFF",
  marginTop: "24px",
  marginBottom: "16px",
  ":hover": {
    backgroundColor: "#B5B5BE",
  },
}));

const ButtonLoginWithGoogle = styled(Button)(({ theme }) => ({
  padding: "6px 16px",
  height: "36px",
  width: "100%",
  borderRadius: "4px",
  backgroundColor: "#FC5A5A",
  color: "#FFF",
  marginTop: "24px",
  marginBottom: "16px",
  ":hover": {
    backgroundColor: "#B5B5BE",
  },
}));

const InstantLogin = styled("div")(({ theme }) => ({
  color: "#B5B5BE",
  padding: "6px 16px",
  fontSize: "60%",
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state: any) => state.auth);

  const loginGoogle = async () => {
    dispatch(authPending());
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result: any) => {
        postIdToken(result._tokenResponse.idToken).then((res: any) => {
          console.log(res.result.accessToken);
          dispatch(
            loginSuccess({
              accessToken: res.result.accessToken,
              refreshToken: res.result.requestToken,
              user: jwtDecode(res.result.accessToken),
            })
          );
          localStorage.setItem(
            "authTokens",
            JSON.stringify({
              accessToken: res.result.accessToken,
              refreshToken: res.result.refreshToken,
            })
          );
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFail(error.message));
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <DivContainner>
        <DivHeader>
          <DivDangNhap>Đăng nhập</DivDangNhap>
        </DivHeader>
        <DivContent>
          <DivForm>
            <Box component="form" sx={{ m: "0" }}>
              <label>Email</label>
              <TextField
                margin="dense"
                required
                fullWidth
                id="email"
                placeholder="Nhập email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <label>Mật khẩu</label>
              <TextField
                margin="dense"
                required
                fullWidth
                name="password"
                placeholder="Nhập mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid item xs>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="success" />}
                    label="Nhớ tài khoản"
                  />
                </Grid>
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Link href="#" variant="body1">
                    Quên mật khẩu
                  </Link>
                </Grid>
              </Grid>
              <ButtonLogin>Đăng nhập</ButtonLogin>
              <InstantLogin>
                ----------------------------Đăng nhập
                với---------------------------
              </InstantLogin>
              <ButtonLoginWithGoogle onClick={loginGoogle} disabled={isLoading}>
                Đăng nhập với Google
              </ButtonLoginWithGoogle>
              {/* {error && <Alert severity="error">{error}</Alert>} */}
            </Box>
          </DivForm>
        </DivContent>
      </DivContainner>
    </ThemeProvider>
  );
};

export default Login;
