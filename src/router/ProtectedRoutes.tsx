import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "redux/store";

type ProtectedRoutesProps = {
  children: React.ReactNode;
  roles: string[];
};

const ProtectedRoutes = ({ children, roles }: ProtectedRoutesProps) => {
  const user = useSelector((state: RootState) => state.auth.auth?.user);

  if (!roles.includes(user!.Role)) {
    return <Navigate to="/permission-denied" />;
  }

  return children;
};

export default ProtectedRoutes;
