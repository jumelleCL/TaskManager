import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../config/axiosApi";
import { Proyects, Tasks } from "../types";
import useUserContext from "../hooks/UseUserContext";
import TaskSection from "../components/TaskSection";
import Button from "../components/design/Button";
import { FaRegEdit, FaRegShareSquare } from "react-icons/fa";
import FormEditProyect from "../components/Forms/FormEditProyect";
import FormShareProyect from "../components/Forms/FormShareProyect";

export type UserSimple = { userId: number; username: string };

export default function ProyectTask() {
  const userContext = useUserContext();

  const { id } = useParams();

  const dialogRefEdit = useRef<HTMLDialogElement>(null);
  const dialogRefShare = useRef<HTMLDialogElement>(null);

  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [project, setProject] = useState<Proyects>();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [members, setMembers] = useState<UserSimple[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = () => {
    axiosApi
      .get(`/api/projects/${id}`)
      .then((resp) => {
        setIsAdmin(resp.data.isAdmin === "admin");
        setTasks(resp.data.tasks);
        setProject(resp.data.project);
      })
      .catch((e) => {
        if (e.response.status === 401) userContext.logOut();
        if (e.response.status === 404) window.location.href = "/404";
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProject();
    axiosApi
      .get(`/api/projects/members/${id}`)
      .then((resp) => setMembers(resp.data))
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
          <div className="flex">
            <FormEditProyect
              className="text-sm"
              ref={dialogRefEdit}
              titul={project?.name}
              descripcion={project?.description}
              onProyectCreated={fetchProject}
            />
            <Button
              onClick={() => dialogRefEdit.current?.showModal()}
              className="relative group"
            >
              <FaRegEdit color="white" />
              <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-sm text-white bg-gray-800 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Editar proyecto
              </span>
            </Button>

            <FormShareProyect />
            <Button
              onClick={() => dialogRefShare.current?.showModal()}
              className="relative group"
            >
              <FaRegShareSquare color="white" />
              <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-sm text-white bg-gray-800 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Compartir
              </span>
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-start gap-5 flex-col md:flex-row m-auto my-10 pb-14">
        <TaskSection
          type="pending"
          tasks={tasks.filter((t) => t.status === "pending")}
          isLoading={loading}
          fetchProject={fetchProject}
          members={members}
        />
        <TaskSection
          type="in_progress"
          tasks={tasks.filter((t) => t.status === "in_progress")}
          isLoading={loading}
          fetchProject={fetchProject}
          members={members}
        />
        <TaskSection
          type="completed"
          tasks={tasks.filter((t) => t.status === "completed")}
          isLoading={loading}
          fetchProject={fetchProject}
          members={members}
        />
      </div>
    </div>
  );
}
