import { forwardRef, useRef } from "react";
import Button from "../design/Button";
import { IoIosClose } from "react-icons/io";
import Input from "../design/Input";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMembersSchema } from "../../../../schemas/projectSchemas";
import { z } from "zod";
import axiosApi from "../../config/axiosApi";
import { FaTrash } from "react-icons/fa";


type FormValues = {
  email: string;
}
type Props = {
  className?: string[];
};

const FormShareProyect = forwardRef<HTMLDialogElement, Props>(
  function FormProyect({ className }: Props, externalRef) {
    const internalRef = useRef<HTMLDialogElement>(null);
    const refToUse =
      !externalRef || typeof externalRef === "function"
        ? internalRef
        : externalRef;
    const {id} = useParams();
    const { register, handleSubmit, formState, watch } = useForm<FormValues>({
      mode: "onChange",
      resolver: zodResolver(addMembersSchema as unknown as z.ZodType<object>),
    });
    const { errors } = formState;
    const handleSend = () => {
      const data = {
        email: watch('email'),
      }

      axiosApi.post(`/api/projects/users/${id}`, data)
      .then((resp)=> {
        console.log(resp);
      }).catch((e)=> {
        console.log(e);
        
      })
    }
    return (
      <dialog ref={refToUse} className={`rounded p-4 ${className}`}>
          <div className="flex justify-between">
            <h2>Compartir</h2>
            <Button
              version="btn-primary"
              onClick={() => refToUse.current?.close()}
              className="bg-transparent border-none p-0 m-0 flex items-center hover:bg-inherit hover:text-slate-950"
            >
              <IoIosClose size={30} color="black" />
            </Button>
          </div>
          <form onSubmit={handleSubmit(handleSend)}>
            <Input className="text-sm" label="ola" type="email" {...register('email')} validate error={errors.email} />
          </form>

          <div>
            <div className="flex items-center"><span>miembro 1</span> <FaTrash size={20} className="text-red-danger" /></div>
          </div>
      </dialog>
    );
  }
);

export default FormShareProyect;
