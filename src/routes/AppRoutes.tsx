import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home";
import ProyectsPage from "../pages/ProyectsPage";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/proyects" element={<ProyectsPage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
