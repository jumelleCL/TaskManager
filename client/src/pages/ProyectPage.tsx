import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../config/axiosApi";
import { Proyects, Tasks } from "../types";
import FormTask from "../components/Forms/FormTask";
import TaskCard from "../components/TaskCard";
import useUserContext from "../hooks/UseUserContext";

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
        if(e.response.status === 401) userContext.logOut()
        window.location.href = "/404";
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
        if(e.response.status === 401) userContext.logOut()
      });
  }, []);
  return (
    <div className="flex flex-col my-10">
      <div className="text-black self-center font-bold text-2xl m-4">
        {project?.name}
      </div>
      <div className="flex items-start gap-5 flex-col md:flex-row">
        <div className="bg-slate-600 rounded p-5 text-white flex flex-col gap-4 min-w-[80vw] md:min-w-[30vw]">
          <h2 className="font-bold">Pending</h2>
          <FormTask onTaskCreated={fetchProject} idProject={Number(id)} />
          {task.map(
            (t) =>
              t.status == "pending" && (
                <TaskCard
                  member={members}
                  onTaskCreated={fetchProject}
                  key={t.id}
                  task={t}
                  priority={t.priority || "low"}
                >
                  {t.title}
                </TaskCard>
              )
          )}
        </div>
        <div className="bg-slate-600 rounded p-5 text-white flex flex-col gap-4 min-w-[80vw] md:min-w-[30vw]">
          <h2 className="font-bold">In progress</h2>
          {task.map(
            (t) =>
              t.status == "in_progress" && (
                <TaskCard
                  member={members}
                  onTaskCreated={fetchProject}
                  key={t.id}
                  task={t}
                  priority={t.priority || "low"}
                >
                  {t.title}
                </TaskCard>
              )
          )}
        </div>
        <div className="bg-slate-600 rounded p-5 text-white flex flex-col gap-4 min-w-[80vw] md:min-w-[30vw]">
          <h2 className="font-bold">Completed</h2>
          {task.map(
            (t) =>
              t.status == "completed" && (
                <TaskCard
                  member={members}
                  onTaskCreated={fetchProject}
                  key={t.id}
                  task={t}
                  priority={t.priority || "low"}
                >
                  {t.title}
                </TaskCard>
              )
          )}
        </div>
      </div>
    </div>
  );
}
