import React from "react";
import { Alert, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import RegisterForm from "./components/RegisterForm";

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
  margin: "12px 0",
}));

const DivRegister = styled("div")(({ theme }) => ({
  width: "100%",
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
  flexDirection: "column",
  margin: "0 20px",
  fontSize: "110%",
}));

const DivContent = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
}));

const Register = () => {
  const { error } = useSelector((state: RootState) => state.auth);

  return (
    <DivContainner>
      <DivHeader>
        <DivRegister>Tạo tài khoản miễn phí</DivRegister>
      </DivHeader>
      <DivContent>
        <DivForm>
          {error && (
            <Alert severity="error" sx={{ mb: 1, width: "100%" }}>
              {error}
            </Alert>
          )}

          <RegisterForm />
        </DivForm>
      </DivContent>
    </DivContainner>
  );
};

export default Register;
