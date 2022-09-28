import { Button, MenuItem, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { RHFInput, RHFRadio, RHFSelect } from "components";
import { RegisterRequestModel } from "models";
import { register } from "api";
import { useDispatch, useSelector } from "react-redux";
import { authPending, loginFail } from "redux/slices/AuthSlice";
import { RootState } from "redux/store";

const CreateAccount = styled(Button)(({ theme }) => ({
  marginBottom: "8px",
  backgroundColor: theme.palette.primary.main,
  color: "white",

  ":hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(90%)",
  },
}));

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Mật khẩu phải lớn hơn 6 kí tự, chứa 1 kí tự in hoa, 1 kí tự in thường và 1 kí tự đặc biệt"
    ),
  gender: Yup.string()
    .required("Vui lòng chọn giới tính")
    .oneOf(["Male", "Female"]),
});

const RegisterForm = () => {
  const defaultValues: RegisterRequestModel = {
    fullName: "",
    email: "",
    password: "",
    gender: "",
    phoneNumber: "0123456789",
  };
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const onSubmit = async (data: RegisterRequestModel) => {
    dispatch(authPending());
    console.log(data);
    register(data)
      .then((res) => {
        navigate("/auth/login");
      })
      .catch((error) => {
        dispatch(loginFail("Tạo tài khoản thất bại"));
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFInput
        name="fullName"
        label="Họ và tên"
        control={control}
        placeholder="Nhập họ và tên"
      />
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
      <RHFRadio
        control={control}
        label="Giới tính"
        name="gender"
        options={[
          {
            id: 1,
            label: "Nam",
            value: "Male",
          },
          {
            id: 2,
            label: "Nữ",
            value: "Female",
          },
        ]}
      />
      <CreateAccount fullWidth disabled={isLoading} type="submit">
        Đăng ký
      </CreateAccount>
    </form>
  );
};

export default RegisterForm;
