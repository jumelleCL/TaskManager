import { forwardRef, useRef } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";

import Input from "../design/Input";
import Button from "../design/Button";
import axiosApi from "../../config/axiosApi";
import useUserContext from "../../hooks/UseUserContext";
import BigInput from "../design/BigInput";

type Props = {
  className?: string;
  titul?: string;
  descripcion?: string;
  onProyectCreated?: () => void;
};
type FormValues = {
  titul: string;
  descripcion: string;
};

const FormEditProyect = forwardRef<HTMLDialogElement, Props>(
  function FormProyect(
    { className, titul, descripcion, onProyectCreated }: Props,
    externalRef
  ) {
    const userContext = useUserContext();
    const { register, handleSubmit, formState, watch } = useForm<FormValues>({
      mode: "onChange",
      defaultValues: {
        titul: titul,
        descripcion: descripcion,
      },
    });

    const { errors, isValid } = formState;
    const internalRef = useRef<HTMLDialogElement>(null);
    const refToUse =
      !externalRef || typeof externalRef === "function"
        ? internalRef
        : externalRef;


    // * Submit // creación de un proyecto
    function onSubmit() {
      const titul = watch("titul");
      const desc = watch("descripcion");
      const start_date = "2024-11-20 18:06:59.900";
      const end_date = "2024-11-30 18:06:59.900";

      const data = {
        name: titul,
        description: desc,
        start_date: start_date,
        end_date: end_date,
      };
      console.log("submit edit proyect");

      console.log(data);

      axiosApi
        .put(`/api/projects/
          `, data)
        .then((resp) => {
          if (resp.data) {
            refToUse.current?.close();
            if (onProyectCreated) onProyectCreated();
          } else return;
        })
        .catch((e) => {
          if(e.response.status === 401) userContext.logOut()
          console.error(e);
        });
    }
    return (
      <dialog
        ref={refToUse}
        className={`bg-slate-200 text-slate-600 p-4 rounded-lg min-w-[80vw] md:min-w-[50vw] border-l-[20px] border-primary flex-col gap-4 ${className}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-2xl">Editar Proyecto</h3>
          <Button
            version="btn-primary"
            onClick={() => refToUse.current?.close()}
            className="bg-transparent border-none p-0 m-0 flex items-center hover:bg-inherit hover:text-slate-950"
          >
            <IoIosClose size={30} color="black" />
          </Button>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1 text-slate-700"
        >
          <Input
            error={errors.titul}
            validate
            type="text"
            label="Título"
            maxLength={10}
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
          <BigInput
            error={errors.descripcion}
            validate
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
                value: 255,
                message: "Máximo 255 caracteres",
              },
            })}
          />


          <Button
            version="btn-primary"
            disabled={!isValid}
            type="submit"
            className="disabled:opacity-50 disabled:cursor-not-allowed mt-3.5 text-slate-200"
          >
            Cambiar
          </Button>
        </form>
      </dialog>
    );
  }
);

export default FormEditProyect;
