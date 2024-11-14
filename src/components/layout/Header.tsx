import Logo from "../design/Logo";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { NavLink } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="flex justify-evenly w-full bg-gray-800 items-center p-3">
      <NavLink to="/">
        <Logo />
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
