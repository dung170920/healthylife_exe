import React from "react";
import { Button, Grid, Box, styled, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "config/config";
import { useDispatch, useSelector } from "react-redux";
import { authPending, loginFail, loginSuccess } from "redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { postIdToken } from "api";
import jwtDecode from "jwt-decode";
import { RootState } from "redux/store";
import { AuthResponseModel } from "models";

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

const DivRegister = styled("div")(({ theme }) => ({
  width: "100%",
  height: "85%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  marginLeft: "20px",
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

const CreateAccount = styled(Button)(({ theme }) => ({
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

const Register = () => {
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
        <DivRegister>Tạo tài khoản miễn phí</DivRegister>
      </DivHeader>
      <DivContent>
        <DivForm>
          <Box component="form" sx={{ m: "0" }}>
            <label>Tên đăng nhập</label>
            <TextField
              margin="dense"
              required
              fullWidth
              id="account"
              placeholder="Nhập tên"
              name="account"
              autoComplete="account"
              autoFocus
            />
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

            <Grid container spacing={1}>
              <Grid item xs>
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
              </Grid>
              <Grid item xs>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  placeholder="Nhập lại mật khẩu mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <CreateAccount fullWidth disabled={isLoading}>
              Đăng nhập
            </CreateAccount>
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

export default Register;
