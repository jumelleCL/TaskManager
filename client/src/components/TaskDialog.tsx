import { forwardRef, useRef } from "react";
import { IoIosClose } from "react-icons/io";

import Input from "./design/Input";
import Select from "./design/Select";
import Button from "./design/Button";
import { AddTaskSchema } from "../../../schemas/taskSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  id?: number;
  title?: string;
  description?: string;
  assigned_to?: number;
  priority?: string;
  status?: string;
};
const TaskDialog = forwardRef<HTMLDialogElement, Props>(function TaskDialog(
  props: Props,
  externalRef
) {
  const { register, handleSubmit, formState, watch } = useForm<Props>({
    mode: "onChange",
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      title: props.title,
      description: props.description,
      priority: props.priority,
      status: props.status
    }
  });

  const { errors, isValid } = formState;

  const internalRef = useRef<HTMLDialogElement>(null);
  const refToUse =
    !externalRef || typeof externalRef === "function"
      ? internalRef
      : externalRef;

  function handleChange() {    
    const data = {
      title: watch("title"),
      description: watch("description"),
      assigned_to: watch("assigned_to"),
      priority: watch("priority"),
      status: watch("status"),
    };
    console.log(data);
    console.log(isValid);
  }
  return (
    <dialog
      ref={refToUse}
      className="p-4 rounded-xl min-w-[70%] py-10 bg-slate-200"
    >
      <form onSubmit={handleSubmit(handleChange)}>
        <div className="grid min-w-full grid-cols-6">
          <Input
            validate
            error={errors.title}
            className="col-start-1 col-end-6"
            label="title"
            {...register("title")}
          />
          <Button
            className="flex justify-center items-center rounded-3xl p-0 py-1"
            onClick={() => refToUse.current?.close()}
          >
            <IoIosClose size={30} color="white" />
          </Button>
        </div>
        <Input
          label="description"
          className="mt-4"
          validate
          error={errors.description}
          {...register("description")}
        />
        <div>
          <div className="flex items-center my-4">
            <p className="mr-4">Prioridad</p>
            <Select {...register('priority')}>
              <option value="low">Low</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </Select>
          </div>
          <div className="flex items-center my-4">
            <p className="mr-4">Estado</p>
            <Select {...register('status')}>
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </Select>
          </div>
          <div className="flex items-center my-4">
            <p className="mr-4">Asignar</p>
            <Select>
              <option value="miembro">Miembro</option>
            </Select>
          </div>
        </div>
      </form>
    </dialog>
  );
});

export default TaskDialog;
