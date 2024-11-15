import { FaBattleNet } from "react-icons/fa";

type LogoProps = {
  color?: string;
};

function Logo(props: LogoProps) {
  const fill = props.color || "gray";

  return <FaBattleNet fill={fill} className="h-12 w-12 m-4 hover:rotate-180 transition-all duration-500" />;
}

export default Logo;
