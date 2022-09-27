import { Box, Button, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { RHFInput } from "components";
import { LoginRequestModel } from "models";
import { login } from "api";
import { useDispatch, useSelector } from "react-redux";
import { authPending, loginFail, loginSuccess } from "redux/slices/AuthSlice";
import jwtDecode from "jwt-decode";
import { RootState } from "redux/store";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const ButtonLogin = styled(Button)(({ theme }) => ({
  marginBottom: "8px",
  marginTop: "16px",
  backgroundColor: theme.palette.primary.main,
  color: "white",

  ":hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(90%)",
  },
}));

const LoginForm = () => {
  const defaultValues: LoginRequestModel = {
    email: "",
    password: "",
  };
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const onSubmit = async (data: LoginRequestModel) => {
    dispatch(authPending());
    console.log(data);
    login(data)
      .then((res) => {
        dispatch(
          loginSuccess({
            accessToken: res.token.accessToken,
            refreshToken: res.token.refreshToken,
            user: jwtDecode(res.token.accessToken),
          })
        );
        localStorage.setItem(
          "authTokens",
          JSON.stringify({
            accessToken: res.token.accessToken,
            refreshToken: res.token.refreshToken,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        dispatch(loginFail("Email hoặc mật khẩu không đúng"));
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFInput
        name="email"
        label="Email"
        control={control}
        placeholder="Nhập email"
      />
      <RHFInput
        name="password"
        label="Mật khẩu"
        control={control}
        placeholder="Nhập mật khẩu"
        type="password"
      />
      <Box sx={{ float: "right", fontSize: 14 }}>
        <Link to="#">Quên mật khẩu</Link>
      </Box>
      <ButtonLogin fullWidth disabled={isLoading} type="submit">
        Đăng nhập
      </ButtonLogin>
    </form>
  );
};

export default LoginForm;
