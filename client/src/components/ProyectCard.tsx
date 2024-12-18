import { FaUserCircle } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";


import { Proyects } from "../types";

export default function ProyectCard({
  name: titul,
  description: descripcio,
  endDate: endDate,
}: Proyects) {  
  const date = endDate ? (typeof endDate === 'string' ? new Date(Date.parse(endDate)) : endDate ): new Date()
  const formattedDate = date.toLocaleDateString('en', { day: '2-digit', month: 'short'})
  return ( 
    <div
      className={`rounded-3xl bg-gray-primary text-secondary flex items-center justify-between h-40 overflow-hidden
                    cursor-pointer px-8 border-l-4 border-primary`}
    >
        <div className="flex flex-col">
          <h2 className="font-bold text-3xl pb-3">{titul}</h2>

          <div>
            <p>
              {descripcio && descripcio.length > 50
                ? `${descripcio.slice(0, 47)}...`
                : descripcio}
            </p>
          </div>
        </div>

        <div className=" flex flex-col items-end w-[50%]">
          <div className="flex items-center" > <p className="px-2">{formattedDate}</p><CiCalendar size={25}/></div>
            <FaUserCircle
              size={30}
              className="text-primary bg-white rounded-full"
            />
        </div>
        
    </div>
  );
}
