import type { FunctionComponent } from "react";
import { Calendar, Search } from "lucide-react";

const CatalogFilter: FunctionComponent = () => {
  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl p-4 flex flex-col justify-between gap-4 shadow-sm min-h-[180px]">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 w-[440px] h-[40px] bg-white">
          <Search className="text-gray-400 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Buscar por nombre del producto"
            className="flex-1 outline-none text-gray-600 placeholder-gray-400 font-medium"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-black text-white rounded-lg px-2 h-[40px]">
          <Calendar className="w-4 h-4" />
          Fechas
        </button>
      </div>

      <div className="flex items-center gap-3 mb-2.5">
        <button className="bg-[#1094DF] text-white rounded-lg px-3 h-[40px] font-medium">
          Total: 3
        </button>
        <select className="bg-black text-white rounded-lg px-2 h-[40px] font-medium appearance-none cursor-pointer">
          <option>Filtrar por carrera</option>
        </select>
      </div>
    </div>
  );
};

export default CatalogFilter;
