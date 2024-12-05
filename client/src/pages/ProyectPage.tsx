import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../config/axiosApi";
import { Proyects, Tasks } from "../types";
import useUserContext from "../hooks/UseUserContext";
import TaskSection from "../components/TaskSection";

export type UserSimple = { userId: number; username: string };

export default function ProyectTask() {
  const userContext = useUserContext();

  const { id } = useParams();
  const [task, setTask] = useState<Tasks[]>([]);
  const [project, setProject] = useState<Proyects>();
  const fetchProject = () => {
    axiosApi
      .get(`/api/projects/${id}`)
      .then((resp) => {
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
      <div className="text-white p-5 font-bold text-2xl m-0 bg-secondary">
        <h2>{project?.name}</h2>
      </div>
      <div className="flex items-start gap-5 flex-col md:flex-row m-auto my-10" >
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
