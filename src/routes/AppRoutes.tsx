import { Routes, Route } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";
import { NewScale } from "../pages/newScale";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/newScale" element={<NewScale />} />
      </Route>
    </Routes>
  );
}
