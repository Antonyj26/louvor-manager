import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Login } from "../pages/Login";

export function AuthRoute() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  );
}
