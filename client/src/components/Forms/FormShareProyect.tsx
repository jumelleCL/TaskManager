import { forwardRef, useRef } from "react";
import Button from "../design/Button";
import { IoIosClose } from "react-icons/io";

type Props = {
  members?: string[];
};

const FormShareProyect = forwardRef<HTMLDialogElement, Props>(
  function FormProyect({ members }: Props, externalRef) {
    const internalRef = useRef<HTMLDialogElement>(null);
    const refToUse =
      !externalRef || typeof externalRef === "function"
        ? internalRef
        : externalRef;

    return (
      <dialog ref={refToUse}>
        <div>
          <span>{members || "a"}</span>
          <Button
            version="btn-primary"
            onClick={() => refToUse.current?.close()}
            className="bg-transparent border-none p-0 m-0 flex items-center hover:bg-inherit hover:text-slate-950"
          >
            <IoIosClose size={30} />
          </Button>
        </div>
      </dialog>
    );
  }
);

export default FormShareProyect;
