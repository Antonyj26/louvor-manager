import { Routes, Route } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";
import { NewScale } from "../pages/NewScale";
import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/newScale" element={<NewScale />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
