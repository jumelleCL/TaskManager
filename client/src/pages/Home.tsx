import { NavLink } from "react-router-dom";
import Button from "../components/design/Button";
import useUserContext from "../hooks/UseUserContext";

function Home() {
  const {user} = useUserContext()
  return (
    <div className="flex items-center justify-center">
      <div>
        <p>Welcome to task manager</p>
        {!user && <NavLink to='/login'><Button text="Crea tu primer proyecto" className="text-white"/></NavLink>}
        {user && <NavLink to='/proyects'><Button text="Crea tu primer proyecto" className="text-white"/></NavLink>}
      </div>
      <div></div>
    </div>
  );
}

export default Home;
