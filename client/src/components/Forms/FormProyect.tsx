import { IoIosClose } from "react-icons/io";
import Input from "../design/Input";
import Button from "../design/Button";
import { useForm } from "react-hook-form";
import { forwardRef, useRef } from "react";
import Select from "../design/Select";
import { Teams } from "../../types";

type Props = {
  teams: Teams[];
  className?: string;
};
type FormValues = {
  titul: string;
  descripcion: string;
};

const FormProyect = forwardRef<HTMLDialogElement, Props>(function FormProyect(
  { teams, className }: Props,
  externalRef
) {  
  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: "onChange",
  });

  const { errors, isValid } = formState;
  const internalRef = useRef<HTMLDialogElement>(null);
  const refToUse =
    !externalRef || typeof externalRef === "function"
      ? internalRef
      : externalRef;

  function onSubmit() {
    console.log("submit");
  }
  return (
    <dialog
      ref={refToUse}
      className={`bg-slate-300 text-slate-600 p-4 rounded-lg min-w-80 flex-col gap-4 ${className}`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Crear Proyecto</h3>
        <Button
          onClick={() => refToUse.current?.close()}
          className="bg-transparent border-none p-0 m-0 flex items-center hover:bg-inherit hover:text-slate-950"
        >
          <IoIosClose size={30} />
        </Button>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 text-slate-700"
      >
        <Input
          error={errors.titul}
          type="text"
          label="Título"
          {...register("titul", {
            required: "titulo requerido",
            minLength: {
              value: 3,
              message: "Mínimo 3 caracteres",
            },
            maxLength: {
              value: 10,
              message: "Máximo 10 caracteres",
            },
          })}
        />
        <Input
          error={errors.descripcion}
          type="text"
          label="Descripción"
          maxLength={50}
          {...register("descripcion", {
            required: "descripcion requerido",
            minLength: {
              value: 3,
              message: "Mínimo 3 caracteres",
            },
            maxLength: {
              value: 10,
              message: "Máximo 10 caracteres",
            },
          })}
        />
        <Select label="Equipo">{
          teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))
        }</Select>
        <Button
          disabled={!isValid}
          type="submit"
          className="disabled:opacity-50 disabled:cursor-not-allowed mt-3.5 text-slate-200"
        >
          Crear
        </Button>
      </form>
    </dialog>
  );
});

export default FormProyect;
