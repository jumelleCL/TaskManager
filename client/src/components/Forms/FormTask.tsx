import { forwardRef, useRef } from "react";
import Input from "../design/Input";
import Button from "../design/Button";
import axiosApi from "../../config/axiosApi";

type Props = {
    onTaskCreated?: ()=> void;
    idProject: number;
}

const FormTask = forwardRef<HTMLFormElement, Props>(function FormTask({onTaskCreated, idProject}: Props, ref) {
  const taskRef = useRef<HTMLInputElement>(null);
  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {projectId: idProject, title: taskRef.current?.value}
    axiosApi
      .post("/api/tasks", data)
      .then((resp) => {
        console.log(resp);
        
        if (resp.data) {
          if(onTaskCreated) onTaskCreated()
            if(taskRef.current)taskRef.current.value = '';
        } else return;
      })
      .catch((e) => {
        console.error(e.response.data.message);
      });
    
  }
  return (
    <form
    ref={ref}
      onSubmit={addTask}
      className="bg-slate-300 rounded grid grid-cols-3 grid-rows-1"
    >
      <div className="col-start-1 col-end-3">
        <Input type="text" label="Nueva tarea"  className="rounded-r-none" ref={taskRef}/>
      </div>{" "}
      <Button type="submit" text="Añadir" className="rounded-l-none" />
    </form>
  );
});

export default FormTask;
