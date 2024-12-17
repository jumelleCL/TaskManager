import { useRef } from "react";
import { useDrag } from "react-dnd";
import TaskDialog from "./TaskDialog";
import { UserSimple } from "../pages/ProyectPage";

type Props = {
  task: {
    id?: number;
    title?: string;
    description?: string;
    project_id?: number;
    status?: string;
    priority?: string;
    assigned_to?: number;
  };
  member: UserSimple[] | null;
  onTaskCreated: () => void;
  children: React.ReactNode;
};

export default function TaskCard({
  children,
  task,
  member,
  onTaskCreated,
}: Props) {
  const colorClasses = {
    low: "border-green-primary",
    medium: "border-yellow-primary",
    high: "border-red-primary",
  };

  const border =
    task.priority === "low" || task.priority === "medium" || task.priority === "high"
      ? colorClasses[task.priority]
      : colorClasses["low"];

  const classes = `bg-white py-4 px-2 rounded-xl ${border}`;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <TaskDialog
        member={member}
        onTaskCreated={onTaskCreated}
        ref={dialogRef}
        id={task.id}
        title={task.title}
        description={task.description}
        assigned_to={task.assigned_to}
        status={task.status}
        priority={task.priority}
      />
      <button
        ref={drag}
        onClick={() => dialogRef.current?.showModal()}
        className={`${classes} border-t-[1.2vh] text-xl ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        {children}
      </button>
    </>
  );
}
