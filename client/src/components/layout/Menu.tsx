// import { FaUserCircle } from "react-icons/fa";
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
        <li onClick={handleLogOut} className="text-slate-300 cursor-pointer">
          Log out
        </li>
      )}
      {!user && (
        <>
          <NavLink to={'/login'}>
            <Button version="btn-icon" text="LogIn" />
          </NavLink>
          <NavLink to={'/register'}>
            <Button version="btn-primary" text="SignUp" />
          </NavLink>
        </>
      )}
    </ul>
  );
}
