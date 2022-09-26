import { Box, Button, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { RHFInput } from "components";

type LoginFormProps = {
  isLoading: boolean;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const ButtonLogin = styled(Button)(({ theme }) => ({
  marginTop: "16px",
  marginBottom: "8px",
  backgroundColor: theme.palette.primary.main,
  color: "white",

  ":hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(90%)",
  },
}));

const LoginForm = ({ isLoading }: LoginFormProps) => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  function onSubmit() {}

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
