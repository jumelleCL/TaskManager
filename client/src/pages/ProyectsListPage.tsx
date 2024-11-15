import { useEffect, useRef, useState } from "react";
import { CanceledError } from "axios";
import axiosApi from "../config/axiosApi";
import FormProyect from "../components/Forms/FormProyect";
import ProyectCard from "../components/ProyectCard";
import { Proyects, Teams } from "../types";

export default function ProyectsListPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Agarrar proyectos
  const [proyects, setProyects] = useState<Proyects[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);
  useEffect(() => {
    const controller = new AbortController();

    axiosApi
      .get("/api/projects", { signal: controller.signal })
      .then((resp) => {
        setProyects(Array.isArray(resp.data) ? resp.data : []);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error(err);
      }); 

    axiosApi
      .get("/api/teams", { signal: controller.signal })
      .then((resp) => {
        setTeams(Array.isArray(resp.data) ? resp.data : []);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error(err);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="flex flex-col my-10 w-full items-center">
      <div>
        <h1 className="text-slate-900 font-bold text-shadow">Mis proyectos</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-10 p-8 w-full">
        <FormProyect ref={dialogRef} teams={teams}/>
        <button onClick={() => dialogRef.current?.showModal()}>
          <ProyectCard newProyect />
        </button>
        {proyects.map((proyect) => (
          <ProyectCard
            key={proyect.id}
            name={proyect.name}
            description={proyect.description}
            end_date={proyect.end_date}
          />
        ))}
      </div>
    </div>
  );
}
