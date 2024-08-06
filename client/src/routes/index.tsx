import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import AuthLayout from "@/layouts/AuthLayout";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [],
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
