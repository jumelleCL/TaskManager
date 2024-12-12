// import { FaUserCircle } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import useUserContext from "../../hooks/UseUserContext";
import Button from "../design/Button";
import { NavLink } from "react-router-dom";

type Props = {
  vertical?: boolean;
};

export default function Menu({ vertical }: Props) {
  // const navItems = [{ name: "Proyects", path: "/proyects", public: false }];

  const { user, logOut } = useUserContext();
  function handleLogOut() {
    logOut();
  }

  return (
    <ul
      className={`flex items-center justify-center gap-10 w-2/5 ${
        vertical && "flex-col"
      }`}
    >
      {user && (
        <li
          onClick={handleLogOut}
          className="relative text-secondary font-bold cursor-pointer group"
        >
          <IoLogInOutline size={30} />
          <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-sm text-white bg-gray-800 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Logout
          </span>
        </li>
      )}
      {!user && (
        <>
          <NavLink to={"/login"}>
            <Button version="btn-icon" text="LogIn" />
          </NavLink>
          <NavLink to={"/register"}>
            <Button version="btn-primary" text="SignUp" />
          </NavLink>
        </>
      )}
    </ul>
  );
}
