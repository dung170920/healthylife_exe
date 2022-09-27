import { lazy, Suspense } from "react";
import { Loading } from "components";
import { Navigate, useRoutes } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "layouts";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import MessageLayout from "layouts/MessageLayout";

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
        { path: "", element: <Navigate to="/auth/login" replace /> },
      ],
    },
    {
      path: "/",
      element: (
        <AuthRoutes>
          <DashboardLayout />
        </AuthRoutes>
      ),
      children: [
        {
          element: <Dashboard />,
          index: true,
        },
        {
          path: "recipes",
          children: [
            {
              path: ":type",
              element: <RecipeList />,
              index: true,
            },
            {
              path: "recipe/:recipeId",
              element: <Recipe />,
            },
            {
              path: "add",
              element: (
                <ProtectedRoutes roles={["Admin", "Chef"]}>
                  <AddRecipe />
                </ProtectedRoutes>
              ),
            },
            {
              path: "result",
              element: <RecipeSearchResult />,
            },
            { path: "", element: <Navigate to="/recipes/foods" replace /> },
          ],
        },
        {
          path: "chefs",
          children: [
            {
              element: (
                <ProtectedRoutes roles={["Admin", "Customer", "Membership"]}>
                  <ChefList />
                </ProtectedRoutes>
              ),
              index: true,
            },
          ],
        },
        {
          path: "menu",
          element: (
            <ProtectedRoutes roles={["Membership"]}>
              <Menu />
            </ProtectedRoutes>
          ),
        },
        {
          path: "upgrade",
          element: <Upgrade />,
        },
        {
          path: "orders",
          children: [
            {
              element: (
                <ProtectedRoutes roles={["Admin", "Membership", "Customer"]}>
                  <OrderList />
                </ProtectedRoutes>
              ),
              index: true,
            },
            {
              path: ":orderId",
              element: (
                <ProtectedRoutes roles={["Admin", "Membership", "Customer"]}>
                  <Order />
                </ProtectedRoutes>
              ),
            },
          ],
        },
        {
          path: "users",
          children: [
            {
              element: (
                <ProtectedRoutes roles={["Admin"]}>
                  <Users />
                </ProtectedRoutes>
              ),
              index: true,
            },
            {
              path: ":userId",
              element: (
                <ProtectedRoutes roles={["Chef", "Customer", "Membership"]}>
                  <Profile />
                </ProtectedRoutes>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/message",
      element: <MessageLayout />,
      children: [
        {
          path: "permission-denied",
          element: <PermissionDenied />,
        },
        {
          path: "not-found",
          element: <NotFound />,
        },
        { path: "", element: <Navigate to="/message/not-found" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/message/not-found" replace /> },
  ]);
}

const Login = Loadable(lazy(() => import("pages/auth/Login")));
const Register = Loadable(lazy(() => import("pages/auth/Register")));

const Dashboard = Loadable(lazy(() => import("pages/dashboard/Dashboard")));

const RecipeList = Loadable(lazy(() => import("pages/recipe/RecipeList")));
const Recipe = Loadable(lazy(() => import("pages/recipe/Recipe")));
const AddRecipe = Loadable(lazy(() => import("pages/recipe/AddRecipe")));
const RecipeSearchResult = Loadable(
  lazy(() => import("pages/recipe/RecipeSearchResult"))
);

const ChefList = Loadable(lazy(() => import("pages/chef/ChefList")));

const Menu = Loadable(lazy(() => import("pages/menu/Menu")));

const OrderList = Loadable(lazy(() => import("pages/order/OrderList")));
const Order = Loadable(lazy(() => import("pages/order/Order")));

const Upgrade = Loadable(lazy(() => import("pages/upgrade/Upgrade")));

const Profile = Loadable(lazy(() => import("pages/profile/Profile")));

const Users = Loadable(lazy(() => import("pages/user/Users")));

const PermissionDenied = Loadable(
  lazy(() => import("pages/message/PermissionDenied"))
);
const NotFound = Loadable(lazy(() => import("pages/message/NotFound")));
