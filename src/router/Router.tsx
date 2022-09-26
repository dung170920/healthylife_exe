import { lazy, Suspense } from "react";
import { Loading } from "components";
import { Navigate, useRoutes } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "layouts";
import AuthRoutes from "./AuthRoutes";

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
        { element: <Dashboard />, index: true },
        {
          path: "recipes",
          children: [
            {
              path: ":type",
              element: <RecipeList />,
            },
            {
              path: "recipe/:recipeId",
              element: <Recipe />,
            },
            {
              path: "add",
              element: <AddRecipe />,
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
              element: <ChefList />,
              index: true,
            },
            {
              path: ":chefId",
              element: <Chef />,
            },
          ],
        },
        {
          path: "menu",
          element: <Menu />,
        },
        {
          path: "upgrade",
          element: <Upgrade />,
        },
        {
          path: "orders",
          children: [
            {
              element: <OrderList />,
              index: true,
            },
            {
              path: ":orderId",
              element: <Order />,
            },
          ],
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
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
const Chef = Loadable(lazy(() => import("pages/chef/Chef")));

const Menu = Loadable(lazy(() => import("pages/menu/Menu")));

const OrderList = Loadable(lazy(() => import("pages/order/OrderList")));
const Order = Loadable(lazy(() => import("pages/order/Order")));

const Upgrade = Loadable(lazy(() => import("pages/upgrade/Upgrade")));

const Profile = Loadable(lazy(() => import("pages/profile/Profile")));
