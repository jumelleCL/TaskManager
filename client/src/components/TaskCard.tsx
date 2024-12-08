import { useRef } from "react";
import TaskDialog from "./TaskDialog";
import { UserSimple } from "../pages/ProyectPage";

type Props = {
  task: {
    id?: number;
    title?: string;
    description?: string;
    project_id?: number;
    status?: string;
    assigned_to?: number;
  };
  member: UserSimple[] | null;
  onTaskCreated: () => void;
  priority: string;
  children: React.ReactNode;
};
export default function TaskCard({
  children,
  priority,
  task,
  member,
  onTaskCreated,
}: Props) {
  const colorClasses = {
    low: "border-green-primary",
    medium: "border-yellow-primary",
    high: "border-red-primary",
  };

  const classes = `bg-white py-4 px-2 rounded-xl ${
    colorClasses[priority || "low"]
  }`;

  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      {task && (
        <TaskDialog
          member={member}
          onTaskCreated={onTaskCreated}
          ref={dialogRef}
          id={task.id}
          title={task.title}
          description={task.description}
          assigned_to={task.assigned_to}
          status={task.status}
          priority={priority}
        />
      )}
      <button
        onClick={() => dialogRef.current?.showModal()}
        className={`${classes} border-t-[1.2vh] text-xl` }
      >
        {children}
      </button>
    </>
  );
}
