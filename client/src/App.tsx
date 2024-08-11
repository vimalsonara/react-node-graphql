import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes";
import { AuthProvider } from "./components/Auth";

export default function App() {
  const router = createBrowserRouter(routes);
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}
