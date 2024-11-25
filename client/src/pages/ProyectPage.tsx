import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../config/axiosApi";
import { Proyects, Tasks } from "../types";
import FormTask from "../components/Forms/FormTask";

export default function ProyectTask() {
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
      .catch(() => {
        window.location.href = "/404";
      });
  }
  useEffect(() => {
    fetchProject()
  });
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
                <div
                  key={t.id}
                  className="border-slate-50 bg-slate-500 border py-4 px-2 rounded"
                >
                  {t.title}
                </div>
              )
          )}
        </div>
        <div className="bg-slate-600 rounded p-5 text-white flex flex-col gap-4 min-w-[80vw] md:min-w-[30vw]">
          <h2 className="font-bold">In progress</h2>
          {task.map(
            (t) =>
              t.status == "in_progress" && (
                <div
                  key={t.id}
                  className="border-slate-50 bg-slate-500 border py-4 px-2 rounded"
                >
                  {t.title}
                </div>
              )
          )}
        </div>
        <div className="bg-slate-600 rounded p-5 text-white flex flex-col gap-4 min-w-[80vw] md:min-w-[30vw]">
          <h2 className="font-bold">Completed</h2>
          {task.map(
            (t) =>
              t.status == "completed" && (
                <div
                  key={t.id}
                  className="border-slate-50 bg-slate-500 border py-4 px-2 rounded"
                >
                  {t.title}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
