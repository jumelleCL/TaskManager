import { FaUserCircle } from "react-icons/fa";
import AppLink from "../design/AppLink";
import useUserContext from "../../hooks/UseUserContext";

type Props = {
  vertical?: boolean;
};

export default function Menu({ vertical }: Props) {
  const navItems = [
    { name: "Proyects", path: "/proyects", public: false },
  ];
  
  const {user, logOut} = useUserContext();
  function handleLogOut() {
    logOut()
  }

  return (
    <ul
      className={`flex items-center justify-center gap-10 w-2/5 ${
        vertical && "flex-col"
      }`}
    >
      {navItems.map((item) => (
        (item.public && !user) || (!item.public && user) &&
        <AppLink
          key={item.name}
          name={item.name}
          path={item.path}
          className="text-slate-300"
        />
      ))}
      {user && <li onClick={handleLogOut}><FaUserCircle color="white"/></li>}
      {!user && <AppLink name="Login" path="/login"
          className="text-slate-300" />}
    </ul>
  );
}
