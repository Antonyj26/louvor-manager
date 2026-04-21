import { Router } from "./routes/Index";
import { AuthProvider } from "./context/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
