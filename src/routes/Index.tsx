import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AuthRoute } from "./AuthRoute";

export function Router() {
  return (
    <BrowserRouter>
      <AuthRoute />
    </BrowserRouter>
  );
}
