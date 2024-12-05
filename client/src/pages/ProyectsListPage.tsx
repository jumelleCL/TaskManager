import { useEffect, useRef, useState } from "react";
import axiosApi from "../config/axiosApi";
import FormProyect from "../components/Forms/FormProyect";
import ProyectCard from "../components/ProyectCard";
import { Proyects } from "../types";
import { NavLink } from "react-router-dom";
import Input from "../components/design/Input";
import useUserContext from "../hooks/UseUserContext";

export default function ProyectsListPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const userContext = useUserContext();
  // Busqueda
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');

  // Agarrar proyectos y equipos
  const [proyects, setProyects] = useState<Proyects[]>([]);

  const searchProject = () => {
    const value = searchRef.current?.value  
    if(value) setSearch(value);
    else setSearch('')
  }
  
  const fetchProjects = () => {
    axiosApi
      .get("/api/projects", { params: {search: search}})
      .then((resp) => {
        console.log(resp);
        
        setProyects(Array.isArray(resp.data) ? resp.data : []);
      })
      .catch((e) => {
        if(e.response.status === 401) userContext.logOut()
      });
  };
  useEffect(() => {    
    fetchProjects();
  }, [search]);

  return (
    <div className="flex flex-col my-10 w-full items-center">
      <div className="w-full text-slate-700 grid px-10">
        <div className="">
          <Input ref={searchRef} label="search" onChange={searchProject}/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-10 p-8 w-full">
        <FormProyect
          ref={dialogRef}
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
