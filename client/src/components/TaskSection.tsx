import { useParams } from "react-router-dom";
import { UserSimple } from "../pages/ProyectPage";
import { Tasks } from "../types";
import FormTask from "./Forms/FormTask"
import TaskCard from "./TaskCard"

type Props = {
    type: 'pending' | 'in_progress' | 'completed';
    tasks: Tasks[];
    fetchProject: () => void;
    members: UserSimple[] | null;
}

export default function TaskSection (props: Props){
  return(
    <div className="bg-gray-primary rounded-xl p-5 text-secondary flex flex-col gap-4 min-w-[80vw] md:min-w-[30vw]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="pb-3 text-3xl">{props.type}</h2>
            <span className="w-full border-t border-black my-2"></span>
            </div>
         
          {props.type === 'pending' && <FormTask onTaskCreated={props.fetchProject} />}
          {props.tasks.map(
            (t) =>
                <TaskCard
                  member={props.members}
                  onTaskCreated={props.fetchProject}
                  key={t.id}
                  task={t}
                  priority={t.priority || "low"}
                >
                  {t.title}
                </TaskCard>
          )}
        </div>
  )
}
