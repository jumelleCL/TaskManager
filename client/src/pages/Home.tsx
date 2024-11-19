import { NavLink } from "react-router-dom";
import Button from "../components/design/Button";
import useUserContext from "../hooks/UseUserContext";
import Phone3d from "../components/Phone3d";

function Home() {
  const {user} = useUserContext()
  return (
    <div className="flex h-full flex-col md:flex-row items-center justify-evenly w-full">
      <div className="flex flex-col gap-16 ml-40">
        <p className="font-bold text-4xl">Welcome to your</p>
        <p className="font-bold text-4xl bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">task manager</p>
        {!user && <NavLink to='/login'><Button text="Create your proyect!" className="text-white"/></NavLink>}
        {user && <NavLink to='/proyects'><Button text="Create your proyect!" className="text-white"/></NavLink>}
      </div>
      <div className="max-w-max">
        {/* <img className="max-w-md" src="https://taskio.app/images/hero.png" alt="" /> */}
        <Phone3d/>
      </div>
    </div>
  );
}

export default Home;
