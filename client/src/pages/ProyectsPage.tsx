import { useEffect, useRef, useState } from "react";
import { CanceledError } from "axios";
import axiosApi from "../config/axiosApi";
import FormProyect from "../components/Forms/FormProyect";
import Proyect from "../components/Proyect";

type Proyects = {
  id: number;
  titul: string;
  descripcio: string;
  end_date: string;
};

export default function ProyectsPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Agarrar proyectos
  const [proyects, setProyects] = useState<Proyects[]>([]);
  useEffect(() => {
    const controller = new AbortController();

    axiosApi
      .get("/api", { signal: controller.signal })
      .then((resp) => {
        console.log(resp);

        setProyects(Array.isArray(resp.data) ? resp.data : []);
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
        <FormProyect ref={dialogRef} />
        <button onClick={() => dialogRef.current?.showModal()}>
          <Proyect newProyect />
        </button>
        {proyects.map((proyect) => (
          <Proyect
            key={proyect.id}
            titul={proyect.titul}
            descripcio={proyect.descripcio}
            endDate={proyect.end_date}
          />
        ))}
      </div>
    </div>
  );
}
