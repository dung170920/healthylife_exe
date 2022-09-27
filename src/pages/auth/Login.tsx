import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Alert, styled } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "config/config";
import { useDispatch, useSelector } from "react-redux";
import { authPending, loginFail, loginSuccess } from "redux/slices/AuthSlice";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postIdToken } from "api/ExternalAuthApi";
import { AuthResponseModel } from "models";
import { RootState } from "redux/store";
import LoginForm from "./components/LoginForm";

const DivContainner = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderTopRightRadius: "16px",
  borderBottomRightRadius: "16px",
  width: "100%",
  height: "115%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

const DivHeader = styled("div")(({ theme }) => ({
  width: "100%",
  height: "12%",
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

const ButtonLoginWithGoogle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#FFF",
  marginTop: "16px",
  marginBottom: "8px",
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
        console.log(result._tokenResponse.idToken);

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
          <Box>
            {error && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            )}
            <LoginForm />
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
          </Box>
        </DivForm>
      </DivContent>
    </DivContainner>
  );
};

export default Login;
