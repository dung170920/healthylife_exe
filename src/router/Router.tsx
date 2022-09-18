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
        { path: "", element: <Navigate to="/auth/login" replace /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Dashboard />, index: true },
        {
          path: "recipes",
          children: [
            {
              path: ":type",
              element: <RecipeList />,
              index: true,
            },
            {
              path: ":recipeId",
              element: <Recipe />,
            },
            {
              path: "add",
              element: <AddRecipe />,
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
          path: "test",
          element: <Recipe />,
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

const ChefList = Loadable(lazy(() => import("pages/chef/ChefList")));
const Chef = Loadable(lazy(() => import("pages/chef/Chef")));

const Menu = Loadable(lazy(() => import("pages/menu/Menu")));

const OrderList = Loadable(lazy(() => import("pages/order/OrderList")));
const Order = Loadable(lazy(() => import("pages/order/Order")));
