import { useEffect, useRef, useState } from "react";
import { CanceledError } from "axios";
import axiosApi from "../config/axiosApi";
import FormProyect from "../components/Forms/FormProyect";
import ProyectCard from "../components/ProyectCard";
import { Proyects, Teams } from "../types";
import { NavLink } from "react-router-dom";
import Input from "../components/design/Input";
import Select from "../components/design/Select";

export default function ProyectsListPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Busqueda
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');

  // Agarrar proyectos y equipos
  const [proyects, setProyects] = useState<Proyects[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);

  const searchProject = () => {
    const value = searchRef.current?.value  
    if(value) setSearch(value);
    else setSearch('')
  }
  
  const fetchProjects = () => {
    axiosApi
      .get("/api/projects", { params: {search: search}})
      .then((resp) => {
        setProyects(Array.isArray(resp.data) ? resp.data : []);
      })
      .catch((e) => {
        console.error(e.response.data.message);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchProjects();
    axiosApi
      .get("/api/teams", {signal: controller.signal})
      .then((resp) => {
        setTeams(Array.isArray(resp.data) ? resp.data : []);
      })
      .catch((e) => {
        if (e instanceof CanceledError) return;
        console.error(e.response.data.message);
      });

    return () => controller.abort();
  }, [search]);

  return (
    <div className="flex flex-col my-10 w-full items-center">
      <div className="w-full text-slate-700 grid grid-cols-4 px-10">
        <div className="col-start-1 col-end-4">
          <Input ref={searchRef} label="search" onChange={searchProject}/>
        </div>
        <Select label="Equipo" className="text-slate-700 rounded-l-none" theme="light">
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-10 p-8 w-full">
        <FormProyect
          ref={dialogRef}
          teams={teams}
          onProyectCreated={fetchProjects}
        />
        <button onClick={() => dialogRef.current?.showModal()}>
          <ProyectCard newProyect />
        </button>
        {proyects.map((proyect) => (
          <NavLink key={proyect.id} to={"/proyect/" + proyect.id}>
            <ProyectCard
              key={proyect.id}
              name={proyect.name}
              description={proyect.description}
              end_date={proyect.end_date}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
