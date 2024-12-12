import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & {
  validate?: boolean;
  error?: string | null;
  text?: string;
  children?: ReactNode;
  version?: 'btn-primary' | 'btn-danger' | 'btn-red' | 'btn-yellow' | 'btn-green' | 'btn-red-disable' | 'btn-yellow-disable' | 'btn-green-disable' | 'btn-icon'
  className?: string;
};
export default function Button({
  text,
  children,
  className,
  validate,
  version,
  error,
  ...rest
}: Props) {
  const classes = twMerge(
    "rounded-lg px-6 py-3 transition-all duration-500",
    version,
    className
  );

  return (
    <div
      className={`${validate && "relative pt-7"} flex flex-col justify-center`}
    >
      {validate && (
        <span className="absolute text-red-700 text-sm top-0 left-0 w-full">
          {error}
        </span>
      )}
      <button {...rest} className={`${classes} ${validate ? "mt-10" : "mt-0"}`}>
        {text || children || "Click"}
      </button>
    </div>
  );
}
