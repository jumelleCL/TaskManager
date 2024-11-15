import { Outlet, Navigate } from "react-router-dom";
import useUserContext from "../hooks/UseUserContext";

function PrivateRoute() {

    const {user} = useUserContext()

  if (user) return <Outlet /> 

  return <Navigate to="/login"/>

}

export default PrivateRoute