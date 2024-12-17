import { useDrop } from "react-dnd";
import { Tasks } from "../types";
import TaskCard from "./TaskCard";
import Loading from "./design/Loading";
import FormTask from "./Forms/FormTask";
import axiosApi from "../config/axiosApi";
import { UserSimple } from "../pages/ProyectPage";

type Props = {
  type: "pending" | "in_progress" | "completed";
  tasks: Tasks[];
  isLoading: boolean;
  fetchProject: () => void;
  members: UserSimple[] | null;
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
};

export default function TaskSection({
  type,
  tasks,
  isLoading,
  fetchProject,
  members,
  setTasks,
}: Props) {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (task: Tasks) => handleDrop(task),
  });

  const handleDrop = async (task: Tasks) => {
    try {
      await axiosApi.put(`/api/tasks/${task.id}`, { status: type });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: type } : t))
      );
      fetchProject();
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  return (
    <div ref={drop} className="bg-gray-primary rounded-xl p-5 text-secondary flex flex-col gap-4 min-w-[80vw] md:min-w-[30vw]">
      <div className="flex flex-col items-center justify-center">
        <h2 className="pb-3 text-3xl">{type}</h2>
        <span className="w-full border-t border-black my-2"></span>
      </div>

      {type === "pending" && <FormTask onTaskCreated={fetchProject} />}

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskCreated={fetchProject}
            member={members}
          >
            {task.title}
          </TaskCard>
        ))
      )}
    </div>
  );
}
