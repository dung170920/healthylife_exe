import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "redux/store";

type AuthRoutesProps = {
  children: React.ReactElement;
};

const AuthRoutes = ({ children }: AuthRoutesProps) => {
  let { auth } = useSelector((state: RootState) => state.auth);

  if (!auth) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default AuthRoutes;
