import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & {
  validate?: boolean;
  error?: string | null;
  text?: string;
  children?: ReactNode;
  className?: string;
};
export default function Button({ text, children, className, validate, error, ...rest }: Props) {
  const classes = twMerge(
    "rounded-lg border px-6 py-3 bg-slate-700 hover:bg-slate-800 transition-all duration-500",
    className
  );

  return (
    <div className={`${(validate && 'relative')}`}>
      {validate &&  (<span className="absolute text-red-700 text-sm top-0 left-0 w-full">{error}</span>)}
      <button {...rest} className={`${classes} ${(validate ? 'mt-10': 'mt-0')}`}>
        {text || children || "Click"}
      </button>
    </div>
  );
}
