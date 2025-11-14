import type { FunctionComponent } from "react";
import DropDown from "../../../../../shared/components/ui/DropDown";

const Content: FunctionComponent = () => {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-visible shadow-sm text-xs text-gray-700 font-inter">
      <div className="overflow-x-auto">
        <div className="min-w-[1100px]">
          {/* Header */}
          <div className="grid grid-cols-8 bg-gray-100 text-gray-600 font-semibold py-2 px-4 text-[12px]">
            <div>Nombre de la encuesta</div>
            <div>Fecha de Envío</div>
            <div>Carrera</div>
            <div>Encuestas Enviadas</div>
            <div>Respondidas</div>
            <div>Sin responder</div>
            <div>Acciones</div>
            <div>Reenvio</div>
          </div>

          {/* Body (scrollable) */}
          <div>
            <div className="grid grid-cols-8 items-center border-t border-gray-200 py-3 px-4 hover:bg-gray-50 transition text-[13px]">
              <div>
                <div className="font-medium text-gray-900 text-[13px]">ITS - Egresados 2025</div>
                <div className="text-gray-400 text-xs">Descripción...</div>
              </div>

              <div className="text-gray-500 text-[13px]">21/10/2025</div>

              <div className="text-gray-700 text-[13px]">ITS</div>

              <div>
                <span className="px-2 py-1 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-sm font-medium">
                  320
                </span>
              </div>

              <div>
                <span className="px-2 py-1 rounded-full border border-green-300 bg-green-50 text-green-600 font-medium text-sm">
                  239
                </span>
              </div>

              <div>
                <span className="px-2 py-1 rounded-full border border-red-300 bg-red-50 text-red-500 font-medium text-sm">
                  239
                </span>
              </div>

              <div className="flex items-center gap-3 justify-center w-10">
                <DropDown
                  items={[
                    { key: "metrics", label: "Ver métricas", onClick: () => console.log("Ver métricas") },
                    { key: "pdf", label: "Generar PDF", onClick: () => console.log("Generar PDF") },
                  ]}
                  buttonClassName="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100"
                  menuClassName="absolute right-0 z-50 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                />
              </div>

              <div className="text-right">
                <button className="text-blue-600 hover:underline font-semibold text-sm">
                  ¿Reenviar Encuestas?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
