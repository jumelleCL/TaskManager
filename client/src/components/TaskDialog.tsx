import { forwardRef, useRef } from "react";
import { IoIosClose } from "react-icons/io";

import Input from "./design/Input";
import Select from "./design/Select";
import Button from "./design/Button";
import { AddTaskSchema } from "../../../schemas/taskSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosApi from "../config/axiosApi";
import { useParams } from "react-router-dom";
import { UserSimple } from "../pages/ProyectPage";
import useUserContext from "../hooks/UseUserContext";

type Props = {
  id?: number;
  title?: string;
  description?: string;
  assigned_to?: number;
  priority?: string;
  status?: string;
  onTaskCreated?: () => void;
  member: UserSimple[] | null;
};
const TaskDialog = forwardRef<HTMLDialogElement, Props>(function TaskDialog(
  props: Props,
  externalRef
) {
  const proyect = Number(useParams().id);
  const userContext = useUserContext()

  const { register, formState, watch } = useForm<Props>({
    mode: "onChange",
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      title: props.title,
      description: props.description,
      priority: props.priority,
      status: props.status,
    },
  });

  const { errors } = formState;

  const internalRef = useRef<HTMLDialogElement>(null);
  const refToUse =
    !externalRef || typeof externalRef === "function"
      ? internalRef
      : externalRef;

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      projectId: proyect,
      id: props.id,
      title: watch("title"),
      description: watch("description") || "",
      assigned_to: props.assigned_to,
      priority: watch("priority"),
      status: watch("status"),
    };

    axiosApi
      .put("/api/tasks", data)
      .then((resp) => {
        if (resp.data) {
          if (props.onTaskCreated) props.onTaskCreated();
          refToUse.current?.close();
        } else return;
      })
      .catch((e) => {
        if(e.response.status === 401) {userContext.logOut()}
        console.error(e.response.data.message);
      });
  }

  return (
    <dialog
      ref={refToUse}
      className="p-4 rounded-xl min-w-[90%] md:min-w-[70%] lg:min-w-[50%] py-5 bg-white border-t-[5vh] border-t-primary"
    >
      <form onSubmit={handleChange}>
        <div className="flex justify-between items-center mb-5 p-4">
          <h2 className="text-4xl font-bold">Edit task</h2>
          <Button
            version="btn-icon"
            type="button"
            className="flex justify-center text-black items-center rounded-3xl p-0 py-1 focus:border-none"
            onClick={() => {
              refToUse.current?.close();
            }}
          >
            <IoIosClose size={50} color="black" />
          </Button>
        </div>
        <div className="grid min-w-full">
          <Input
          className="rounded-4xl"
            validate
            error={errors.title}
            label="title"
            {...register("title")}
          />
        </div>
        <Input
          label="description"
          required={false}
          className="mt-4"
          validate
          {...register("description")}
        />
        <div>
          <div className="flex items-center my-4">
            <p className="mr-4">Prioridad</p>
            <Select {...register("priority")}>
              <option value="low">Low</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </Select>
          </div>
          <div className="flex items-center my-4">
            <p className="mr-4">Estado</p>
            <Select {...register("status")}>
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </Select>
          </div>
          <div className="flex items-center my-4">
            <p className="mr-4">Asignar</p>
            <Select>
              {props.member?.map((m) => (
                <option key={m.userId} value={m.userId}>
                  {m.username}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-evenly">
            <Button
              version="btn-primary"
              validate
              type="submit"
              className="disabled:opacity-50 disabled:cursor-not-allowed mt-3.5 text-slate-200 active:bg-slate-500"
              text="Cambiar"
            />
  
            <Button
              version="btn-danger"
              validate
              type="button"
              className="disabled:opacity-50 disabled:cursor-not-allowed mt-3.5 text-slate-200 active:bg-slate-500"
              text="Eliminar"
            />
          </div>
        </div>
      </form>
    </dialog>
  );
});

export default TaskDialog;
