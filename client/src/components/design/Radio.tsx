import { ComponentProps, forwardRef, useId } from "react";

type Props = ComponentProps<"input"> & {
  className?: string;
  label: string;
  priority?: string;
};

const Radio = forwardRef<HTMLInputElement, Props>(function Radio({ priority, label, ...rest }: Props, ref) {
  const colorClasses = {
    low: { primary: "peer-checked:bg-green-primary", bg: "bg-green-disable" },
    medium: {
      primary: "peer-checked:bg-yellow-primary",
      bg: "bg-yellow-disable",
    },
    high: { primary: "peer-checked:bg-red-primary", bg: "bg-red-disable" },
    none: { primary: "peer-checked:bg-slate-400", bg: "bg-slate-200" },
  };
  const bg =
    priority === "low" || priority === "medium" || priority === "high"
      ? colorClasses[priority]
      : colorClasses["none"];

  const id = useId();
  return (
    <>
      <label className={`cursor-pointer`} htmlFor={id}>
        <input
        ref={ref}
          type="radio"
          id={id}
          className="opacity-0 peer"
          {...rest}
          />
        <span className={`${bg.primary} ${bg.bg} rounded px-2 py-1`}>
          {label}
        </span>
      </label>
    </>
  );
}
)

export default Radio;