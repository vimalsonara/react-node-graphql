import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/components/Auth";

export default function MainLayout() {
  const { user } = useAuth();
  if (user === null) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
