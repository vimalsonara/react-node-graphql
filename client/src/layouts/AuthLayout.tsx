import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/components/Auth";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
