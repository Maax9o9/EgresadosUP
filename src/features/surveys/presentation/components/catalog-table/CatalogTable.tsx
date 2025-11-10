import type { FunctionComponent } from "react";
import { Trash2, Pencil } from "lucide-react";

const CatalogTable: FunctionComponent = () => {
  return (
    <div className="w-full bg-white rounded-md border border-gray-200 overflow-hidden text-[13px] text-gray-700 font-inter">
      <div className="overflow-x-auto">
        <div className="min-w-[1100px]">
          {/* Encabezado */}
          <div className="grid grid-cols-[40px_2fr_3fr_150px_80px_100px] bg-gray-100 text-gray-500 font-medium py-2 px-4 text-xs items-center">
            <div className="flex items-center justify-center">
              <input type="checkbox" className="w-3 h-3 accent-blue-500" />
            </div>
            <div>Título</div>
            <div>Descripción</div>
            <div>Fecha de creación</div>
            <div className="text-center">Reactivos</div>
            <div className="text-center">Acciones</div>
          </div>

          <div className="grid grid-cols-[40px_2fr_3fr_150px_80px_100px] items-center border-t border-gray-200 py-3 px-4 text-[13px] hover:bg-gray-50">
            <div className="flex items-center justify-center">
              <input type="checkbox" className="w-3 h-3 accent-blue-500" />
            </div>

            <div className="font-medium text-gray-900">Encuesta 2025</div>

            <div className="text-gray-500 text-[13px] leading-snug">
              Ejemplo de descripción <br /> para descripciones largas
            </div>

            <div className="text-gray-500 text-[13px]">21/10/2025</div>

            <div className="flex justify-center">
              <span className="px-3 py-[2px] rounded-md border border-gray-300 bg-gray-50 text-gray-600 text-xs font-medium">
                30
              </span>
            </div>

            <div className="flex justify-center items-center gap-3">
              <button className="text-gray-500 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="text-gray-500 hover:text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogTable;
