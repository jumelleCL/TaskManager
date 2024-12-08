import { NavLink } from "react-router-dom";
import Button from "../components/design/Button";
import useUserContext from "../hooks/UseUserContext";
import { FaRegCircle } from "react-icons/fa";

function Home() {
  const { user } = useUserContext();
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-20 w-full bg-secondary overflow-hidden">
      <FaRegCircle
        color="#3260F4"
        className="absolute -top-20 -left-20 w-52 h-52 md:w-96 md:h-96 opacity-50 animate-float"
      />
      <FaRegCircle
        color="#3260F4"
        className="absolute -top-40 left-2/4 w-72 h-72 opacity-10 animate-float"
      />
      <FaRegCircle
        color="#3260F4"
        className="absolute top-1/4 -right-40 w-60 h-60 md:w-80 md:h-80 0 opacity-70 animate-float"
      />
      <FaRegCircle
        color="#3260F4"
        className="absolute -bottom-32 left-1/4 w-64 h-64 opacity-10 animate-float"
      />
      <FaRegCircle
        color="#3260F4"
        className="absolute -bottom-50 left-1/4 w-10 h-10 opacity-10 animate-float"
      />

      <div className="flex items-center text-center">
        <h1 className="text-5xl font-bold text-gray-primary flex flex-col items-center">
          Organize your proyects easily with 
         
            <span>Task<span className="text-[#9FB1EB]">Manager</span></span>
        </h1>
      </div>
      <div className="">
        {!user && (
          <NavLink to="/login">
            <Button
              version="btn-primary"
              text="Create your proyect!"
              className="text-white"
            />
          </NavLink>
        )}
        {user && (
          <NavLink to="/proyects">
            <Button
              version="btn-primary"
              text="Create your proyect!"
              className="text-white"
            />
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Home;
