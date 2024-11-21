import { Route, Routes } from "react-router-dom";
import {Home, PrivateRoute, ProyectsListPage, PublicRoute, Login, Register, Error404, ProyectPage} from './Routes'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/proyects" element={<ProyectsListPage />} />
        <Route path="/proyect/:id" element={<ProyectPage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
