import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex items-center justify-center px-4 w-full min-h-screen bg-radial-gradient">
      <Outlet />
    </div>
  );
}
