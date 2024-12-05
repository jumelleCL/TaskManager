import { forwardRef, useRef } from "react";
import Input from "../design/Input";
import Button from "../design/Button";
import axiosApi from "../../config/axiosApi";
import useUserContext from "../../hooks/UseUserContext";
import { useParams } from "react-router-dom";

type Props = {
    onTaskCreated?: ()=> void;
}

const FormTask = forwardRef<HTMLFormElement, Props>(function FormTask({onTaskCreated}: Props, ref) {
  const taskRef = useRef<HTMLInputElement>(null);
  const userContext = useUserContext()
  const idProject = Number(useParams().id)
  
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
        if(e.response.data.status === 401) userContext.logOut()
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
      <Button version="btn-primary" type="submit" text="Añadir" className="rounded-l-none" />
    </form>
  );
});

export default FormTask;
