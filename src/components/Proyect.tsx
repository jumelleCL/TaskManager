import { FaPlus, FaPlusCircle, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

type Proyects = {
  id?: number;
  titul?: string;
  descripcio?: string;
  endDate?: string;
  newProyect?: boolean;
};

export default function Proyect({
  titul,
  descripcio,
  newProyect,
  endDate,
}: Proyects) {
  const calculateDaysLeft = (endDate: string) => {
    const currentDate = new Date();
    const endDateObj = new Date(Date.parse(endDate));

    const timeDiff = endDateObj.getTime() - currentDate.getTime();
    return Math.abs(Math.ceil(timeDiff / (1000 * 3600 * 24)));
  };
  const daysLeft = endDate ? calculateDaysLeft(endDate) : null;

  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div
      className={`rounded-3xl bg-slate-300 text-black flex flex-col items-start justify-evenly h-40 overflow-hidden
                    cursor-pointer px-8 ${
                      newProyect &&
                      "border-2 border-slate-600 transition-all duration-500 hover:bg-slate-200"
                    }`}
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-xl">{titul}</h2>

        {!newProyect && (
          <div
            onClick={handleToggleOptions}
            className="cursor-pointer relative"
          >
            <HiDotsVertical size={20} color="black" />

            {showOptions && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-lg">
                <ul>
                  <li className="px-4 py-1 cursor-pointer hover:bg-gray-200">
                    Eliminar
                  </li>
                  <li className="px-4 py-1 cursor-pointer hover:bg-gray-200">
                    Editar
                  </li>
                  <li className="px-4 py-1 cursor-pointer hover:bg-gray-200">
                    Compartir
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <p>
          {descripcio && descripcio.length > 50
            ? `${descripcio.slice(0, 47)}...`
            : descripcio}
        </p>
        {newProyect && (
          <div>
            <FaPlus size={50} color="gray" />{" "}
            <p className="font-bold text-2xl py-4">New proyect</p>
          </div>
        )}
      </div>

      {!newProyect && (
        <div className="w-full flex flex-col">
          <span className="w-full border-t border-black my-2"></span>
          <div className="flex justify-between items-center w-full">
            <div className="flex space-x-[-8px]">
              <FaUserCircle
                size={24}
                className="text-gray-700 bg-white rounded-full"
              />
              <FaUserCircle
                size={24}
                className="text-gray-700 bg-white rounded-full"
              />
              <FaUserCircle
                size={24}
                className="text-gray-700 bg-white rounded-full"
              />
              <FaPlusCircle
                size={24}
                className="text-gray-700 hover:text-gray-500 bg-white rounded-full"
              />
            </div>
            {daysLeft !== null && daysLeft < 7 && daysLeft >= 0 && (
              <p className="rounded-full bg-red-600 px-4 w-fit text-slate-50">
                {daysLeft} days left
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
