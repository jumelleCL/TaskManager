import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../config/axiosApi";
import { Proyects, Tasks } from "../types";
import useUserContext from "../hooks/UseUserContext";
import TaskSection from "../components/TaskSection";
import Button from "../components/design/Button";
import { FaRegEdit } from "react-icons/fa";
import FormEditProyect from "../components/Forms/FormEditProyect";
import FormShareProyect from "../components/Forms/FormShareProyect";

export type UserSimple = { userId: number; username: string };

export default function ProyectTask() {
  const userContext = useUserContext();

  const { id } = useParams();

  const dialogRefEdit = useRef<HTMLDialogElement>(null);
  const dialogRefShare = useRef<HTMLDialogElement>(null);

  const [task, setTask] = useState<Tasks[]>([]);
  const [project, setProject] = useState<Proyects>();
  const [isAdmin, setIsAdmin] = useState<boolean>();

  const fetchProject = () => {
    axiosApi
      .get(`/api/projects/${id}`)
      .then((resp) => {
        setIsAdmin(resp.data.isAdmin === "admin" ? true : false);
        setTask(resp.data.tasks);
        setProject(resp.data.project);
      })
      .catch((e) => {
        if (e.response.status === 401) userContext.logOut();
        if (e.response.status === 404) window.location.href = "/404";
      });
  };
  const [members, setMembers] = useState<UserSimple[] | null>(null);

  useEffect(() => {
    fetchProject();
    axiosApi
      .get("api/projects/members/" + id)
      .then((resp) => {
        setMembers(resp.data);
      })
      .catch((e) => {
        console.error(e.response.data.message);
        if (e.response.status === 401) userContext.logOut();
      });
  }, []);

  return (
    <div className="flex flex-col m-0 w-full">
      <div className="flex justify-between items-center text-white p-5 font-bold text-2xl m-0 bg-secondary">
        <h2>{project?.name}</h2>
        {isAdmin && (
          <>
            <FormEditProyect className="text-sm" ref={dialogRefEdit} titul={project?.name} descripcion={project?.description} />
            <Button
              version="btn-icon"
              onClick={() => dialogRefEdit.current?.showModal()}
            >
              <FaRegEdit color="white" />
            </Button>

            <FormShareProyect/>
            <Button
              version="btn-icon"
              onClick={() => dialogRefShare.current?.showModal()}
            >
              <FaRegEdit color="white" />
            </Button>
          </>
        )}
      </div>
      <div className="flex items-start gap-5 flex-col md:flex-row m-auto my-10">
        <TaskSection
          type="pending"
          tasks={task.filter((t) => t.status === "pending")}
          fetchProject={fetchProject}
          members={members}
        />
        <TaskSection
          type="in_progress"
          tasks={task.filter((t) => t.status === "in_progress")}
          fetchProject={fetchProject}
          members={members}
        />
        <TaskSection
          type="completed"
          tasks={task.filter((t) => t.status === "completed")}
          fetchProject={fetchProject}
          members={members}
        />
      </div>
    </div>
  );
}
