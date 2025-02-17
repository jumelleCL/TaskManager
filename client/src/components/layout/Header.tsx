import Logo from "../design/Logo";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { NavLink } from "react-router-dom";
import useUserContext from "../../hooks/UseUserContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggle() {
    setIsMenuOpen(!isMenuOpen);
  }
  
  const {user} = useUserContext()

  return (
    <header className="flex justify-between w-full h-16 bg-gray-primary items-center px-10 py-3">
      <NavLink to={user ? '/proyects' : '/'}>
        <Logo/>
      </NavLink>
      <div className="hidden sm:block">
        <Menu />
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 start-0 w-full h-full bg-gray-600 flex items-center justify-center z-30">
          <button onClick={toggle} className="absolute top-2 end-2">
            <IoClose size="35" />
          </button>
          <Menu vertical />
        </div>
      )}

      <button onClick={toggle} className="sm:hidden">
        <FaBars size={30} />
      </button>
    </header>
  );
}

export default Header;
