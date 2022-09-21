import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Alert, styled } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "config/config";
import { useDispatch, useSelector } from "react-redux";
import { authPending, loginFail, loginSuccess } from "redux/slices/AuthSlice";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postIdToken } from "api/AuthApi";
import { AuthResponseModel } from "models";
import { RootState } from "redux/store";

const DivContainner = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderTopRightRadius: "16px",
  borderBottomRightRadius: "16px",
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
  margin: "0 20px",
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
  marginTop: "24px",
  marginBottom: "16px",
  backgroundColor: theme.palette.primary.main,
  color: "white",

  ":hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(90%)",
  },
}));

const ButtonLoginWithGoogle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#FFF",
  marginTop: "24px",
  marginBottom: "16px",
  ":hover": {
    backgroundColor: theme.palette.error.main,
    filter: "brightness(90%)",
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
  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const loginGoogle = async () => {
    dispatch(authPending());
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result: any) => {
        postIdToken(result._tokenResponse.idToken).then(
          (res: AuthResponseModel) => {
            dispatch(
              loginSuccess({
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                user: jwtDecode(res.accessToken),
              })
            );
            localStorage.setItem(
              "authTokens",
              JSON.stringify({
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
              })
            );
            navigate("/");
          }
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFail(error.message));
      });
  };
  return (
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
            <ButtonLogin fullWidth disabled={isLoading}>
              Đăng nhập
            </ButtonLogin>
            <InstantLogin>
              ----------------------------Đăng nhập
              với---------------------------
            </InstantLogin>
            <ButtonLoginWithGoogle
              fullWidth
              onClick={loginGoogle}
              disabled={isLoading}
            >
              Đăng nhập với Google
            </ButtonLoginWithGoogle>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DivForm>
      </DivContent>
    </DivContainner>
  );
};

export default Login;
