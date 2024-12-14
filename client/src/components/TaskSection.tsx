import { UserSimple } from "../pages/ProyectPage";
import { Tasks } from "../types";
import Loading from "./design/Loading";
import FormTask from "./Forms/FormTask";
import TaskCard from "./TaskCard";

type Props = {
  type: 'pending' | 'in_progress' | 'completed';
  tasks: Tasks[];
  isLoading: boolean; // Línea modificada
  fetchProject: () => void;
  members: UserSimple[] | null;
};

export default function TaskSection({ type, tasks, isLoading, fetchProject, members }: Props) {
  return (
    <div className="bg-gray-primary rounded-xl p-5 text-secondary flex flex-col gap-4 min-w-[80vw] md:min-w-[30vw]">
      <div className="flex flex-col items-center justify-center">
        <h2 className="pb-3 text-3xl">{type}</h2>
        <span className="w-full border-t border-black my-2"></span>
      </div>

      {type === 'pending' && <FormTask onTaskCreated={fetchProject} />}

      {isLoading ? ( // Línea modificada
        <div className="flex items-center justify-center"><Loading/></div>
      ) : (
        tasks.map((t) => (
          <TaskCard
            member={members}
            onTaskCreated={fetchProject}
            key={t.id}
            task={t}
            priority={t.priority || "low"}
          >
            {t.title}
          </TaskCard>
        ))
      )}
    </div>
  );
}
