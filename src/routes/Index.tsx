import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AuthRoute } from "./AuthRoute";
import { useAuth } from "../hooks/useAuth";

export function Router() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-(--bg-base) text-(--text-primary)">
        Carregando...
      </div>
    );
  }

  return (
    <BrowserRouter>{session ? <AppRoutes /> : <AuthRoute />}</BrowserRouter>
  );
}
