import { Outlet, Navigate } from "react-router-dom";
import useUserContext from "../hooks/UseUserContext";

function PublicRoute() {

    const {user} = useUserContext()
  if (!user) return <Outlet /> 

  return <Navigate to="/"/>

}

export default PublicRoute