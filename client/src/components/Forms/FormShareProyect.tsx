import { forwardRef, useEffect, useRef, useState } from "react";
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
};
type Member = {
  email: string,
  userId: number, 
  username: string,
  role: string
}
type Props = {
  className?: string[];
  onNewMember?: () => void;
};

const FormShareProyect = forwardRef<HTMLDialogElement, Props>(
  function FormProyect({ className, onNewMember }: Props, externalRef) {
    const internalRef = useRef<HTMLDialogElement>(null);
    const refToUse =
      !externalRef || typeof externalRef === "function"
        ? internalRef
        : externalRef;
    const { id } = useParams();
    const { register, handleSubmit, formState, watch , setValue} = useForm<FormValues>({
      mode: "onChange",
      resolver: zodResolver(addMembersSchema as unknown as z.ZodType<object>),
    });
    const { errors } = formState;

    const [members, setMembers] = useState<Member[]>();
    const getMembers = () => {
      axiosApi.get(`/api/projects/members/${id}`).then((resp) => {
        setMembers(resp.data);
        if(onNewMember) onNewMember();
      });
    };
    useEffect(() => {
      getMembers();
    }, []);
    const handleSend = () => {
      const data = {
        email: watch("email"),
      };
      axiosApi
        .post(`/api/projects/members/${id}`, data)
        .then((resp) => {
          console.log(resp);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(function () {
          setValue('email', '')
          getMembers()
        });
    };

    const handleDelete = (idMember: number) => {
      const dataDelete = {
        data:{
          id: idMember}
      }
      console.log(idMember);
      
      axiosApi.delete(`/api/projects/members/${id}`, dataDelete)
      .then((resp)=> {
        console.log(resp);
        
      }).catch((e) => console.error(e))
      .finally(function (){ getMembers()})
    }
    return (
      <dialog
        ref={refToUse}
        className={`rounded-3xl w-[80vw] pb-8 md:w-[50vw] border-primary ${className}`}
      >
        <div className="flex justify-between p-4 mb-8 bg-primary text-white">
          <h2>Share</h2>
          <Button
            version="btn-icon"
            onClick={() => refToUse.current?.close()}
            className="bg-transparent border-none p-0 m-0 flex items-center hover:bg-inherit hover:text-slate-950"
          >
            <IoIosClose size={30} color="white" />
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(handleSend)}
          className="grid grid-cols-4 items-center px-4"
        >
          <Input
            validate
            error={errors.email}
            className="text-sm col-start-1 col-end-4"
            label="Email"
            type="text"
            inputClass="bg-gray-primary"
            {...register("email")}
          />
          <Button
            version="btn-primary"
            type="submit"
            text="Send"
            className="mb-4 h-12"
          />
        </form>
        { members && members?.length > 1 && <>
          <div className="flex flex-col ">
            <span className="text-[1.2rem] bg-gray-primary pl-6">Members</span>
            <span className="w-full border-t border-black mb-2"></span>
          </div>
  
          <div className="flex flex-col overflow-y-scroll max-h-[10rem] mx-4">
            {members?.filter((member) => member.role !== "admin").map((member) => (
              <div key={member.userId} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-[1.2rem] font-normal">
                    {member.email}
                  </span>{" "}
                  <Button onClick={() => handleDelete(member.userId)}><FaTrash size={20} className="text-red-danger" /></Button>
                </div>
                <span className="w-full border-t border-black my-2"></span>
              </div>
            ))}
          </div>
        </>}
      </dialog>
    );
  }
);

export default FormShareProyect;
