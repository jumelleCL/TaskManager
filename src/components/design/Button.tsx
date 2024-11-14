import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & {
  text?: string;
  children?: ReactNode;
  className?: string;
};
export default function Button({ text, children, className, ...rest }: Props) {
  const classes = twMerge(
    "rounded-lg border px-6 py-3 bg-slate-700 hover:bg-slate-800 transition-all duration-500",
    className
  );

  return (
    <button {...rest} className={classes}>
      {text || children || "Click"}
    </button>
  );
}
