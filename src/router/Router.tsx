import { lazy, Suspense } from "react";
import { Loading } from "components";
import { Navigate, useRoutes } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "layouts";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
          index: true,
        },
        {
          path: "register",
          element: <Register />,
        },
        { path: "/auth", element: <Navigate to="/auth/login" replace /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
    },
  ]);
}

const Login = Loadable(lazy(() => import("pages/auth/Login")));
const Register = Loadable(lazy(() => import("pages/auth/Register")));
