import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type LiProps = {
  name: string;
  path: string;
  className?: string;
};

export default function AppLink({ name, path, className }: LiProps) {
  const baseClasses =
    "relative transition-colors duration-500 ease-in-out text-blue-500 hover:text-blue-300 cursor-pointer";
  const classes = twMerge(baseClasses, className);
  return (
    <li>
      <NavLink to={path} className={classes}>
        {name}
        <span className="block absolute left-0 bottom-0 h-0 w-full bg-blue-text-blue-300 transition-all duration-500 ease-in-out hover:h-1"></span>
      </NavLink>
    </li>
  );
}
