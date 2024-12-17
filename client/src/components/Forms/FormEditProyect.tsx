import { IoIosClose } from "react-icons/io";
import Input from "../design/Input";
import Button from "../design/Button";
import { useForm } from "react-hook-form";
import { forwardRef, useRef } from "react";
import axiosApi from "../../config/axiosApi";
import useUserContext from "../../hooks/UseUserContext";
import { addProjectSchema } from "../../../../schemas/projectSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams } from "react-router-dom";
import BigInput from "../design/BigInput";

type Props = {
  className?: string;
  titul?: string;
  descripcion?: string;
  onProyectCreated?: () => void;
};
type FormValues = {
  name: string;
  description: string;
};

const FormEditProyect = forwardRef<HTMLDialogElement, Props>(function FormProyect(
  { className, titul, descripcion, onProyectCreated }: Props,
  externalRef
) {
  const userContext = useUserContext()
  const { register, handleSubmit, formState, watch } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: titul,
      description: descripcion
    },
    resolver: zodResolver(addProjectSchema as unknown as z.ZodType<object>),
  });

  const { id } = useParams();
  const { errors, isValid } = formState;
  const internalRef = useRef<HTMLDialogElement>(null);
  const refToUse =
    !externalRef || typeof externalRef === "function"
      ? internalRef
      : externalRef;

  // * Submit // creación de un proyecto
  function onSubmit() {
    const titul = watch("name");
    const desc = watch("description");

    const data = {
      name: titul,
      description: desc,
    };
    axiosApi
      .post(`/api/projects/${id}`, data)
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
        <h3 className="font-bold text-2xl">Edit Proyect</h3>
        <Button
          version="btn-primary"
          onClick={() => refToUse.current?.close()}
          className="bg-transparent border-none p-0 m-0 flex items-center hover:bg-inherit hover:text-slate-950"
        >
          <IoIosClose size={30} color="black"/>
        </Button>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 text-slate-700"
      >
        <Input
          error={errors.name}
          validate
          type="text"
          label="Title"
          inputClass="bg-gray-primary"
          maxLength={30}
          {...register("name")}
        />
        <BigInput
          error={errors.description}
          validate
          type="text"
          label="Description"
          maxLength={180}
          {...register("description")}
        />

        <div className="flex items-center justify-center">
          <Button
            version="btn-primary"
            disabled={!isValid}
            type="submit"
            className="disabled:opacity-50 disabled:cursor-not-allowed mt-3.5 text-slate-200 w-fit"
          >
            Edit
          </Button>
        </div>
      </form>
    </dialog>
  );
});

export default FormEditProyect;
