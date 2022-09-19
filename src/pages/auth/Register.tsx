import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, styled } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "config/config";
import { useDispatch, useSelector } from "react-redux";
import { authPending, loginFail, loginSuccess } from "redux/slices/AuthSlice";

import { useNavigate } from "react-router-dom";

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

const CreateAccount = styled(Button)(({ theme }) => ({
  padding: "6px 16px",
  height: "36px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid ",
  backgroundColor: "#1AC073",
  color: "#FFF",
  marginTop: "15px",
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
  marginTop: "15px",
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state: any) => state.auth);

  const loginGoogle = async () => {
    dispatch(authPending());
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    // .then((result) => {
    //   console.log(result._tokenResponse.idToken);
    //   postIdToken(result._tokenResponse.idToken).then((res) => {
    //     console.log(res);
    //     dispatch(
    //       loginSuccess({
    //         accessToken: res.accessToken,
    //         refreshToken: res.requestToken,
    //         user: jwtDecode(res.accessToken),
    //       })
    //     );
    //     localStorage.setItem(
    //       "authTokens",
    //       JSON.stringify({
    //         accessToken: res.accessToken,
    //         refreshToken: res.refreshToken,
    //       })
    //     );
    //     navigate("/");
    //   });
    // })
    // .catch((error) => {
    //   console.log(error);
    //   dispatch(loginFail(error.message));
    // });
  };

  return (
    <ThemeProvider theme={theme}>
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
              <CreateAccount>Đăng nhập</CreateAccount>
              <InstantLogin>
                ----------------------------Đăng nhập
                với---------------------------
              </InstantLogin>
              <ButtonLoginWithGoogle onClick={loginGoogle} disabled={isLoading}>
                Đăng nhập với Google
              </ButtonLoginWithGoogle>
            </Box>
          </DivForm>
        </DivContent>
      </DivContainner>
    </ThemeProvider>
  );
};

export default Register;
