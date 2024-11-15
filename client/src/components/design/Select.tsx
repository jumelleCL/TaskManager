import { twMerge } from "tailwind-merge";

type SelectProps = {
  className?: string;
  label?: string;
  children?: React.ReactNode;
  theme?: "light" | "dark";
};

export default function Select({
  children,
  className,
  theme,
  label,
  ...rest
}: SelectProps) {
  const styles = twMerge('flex p-2 text-base border rounded-md', className)
  return (
    <select
      {...rest}
      className={` ${
        theme === "light"
          ? "bg-gray-100 text-black border-gray-300"
          : "bg-gray-800 text-white border-gray-700"
      } ${styles}`}
    >
      {label && (<option disabled selected>Equipo</option>)}
      {children}
    </select>
  );
}
