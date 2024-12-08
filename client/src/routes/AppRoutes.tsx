import { Route, Routes } from "react-router-dom";
import {Home, PrivateRoute, ProyectsListPage, PublicRoute, Error404, ProyectPage} from './Routes'
import LoginRegister from "../pages/LoginRegister";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/proyects" element={<ProyectsListPage />} />
        <Route path="/proyect/:id" element={<ProyectPage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister/>} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
