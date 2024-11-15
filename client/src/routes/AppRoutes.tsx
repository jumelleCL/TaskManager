import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home";
import ProyectsListPage from "../pages/ProyectsListPage";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Error404 from "../pages/Error404";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/proyects" element={<ProyectsListPage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
