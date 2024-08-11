import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import AuthLayout from "@/layouts/AuthLayout";
import Home from "@/pages";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];
