import { useState, useMemo, type FunctionComponent } from "react";
import { Send, Trash2, Pencil, Eye, MoreVertical, X, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ROUTES } from "@/shared/constants/route";

interface Survey {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  career: string;
  sent: number;
  responded: number;
  notResponded: number;
}

interface TableProps {
  surveys: Survey[];
  isLoading: boolean;
  searchTerm?: string;
  selectedCareer?: string;
  selectedDate?: string | null;
  sortBy?: string;
  onSelectionChange?: (count: number) => void;
}

const Table: FunctionComponent<TableProps> = ({ 
  surveys,
  isLoading,
  searchTerm = "",
  selectedCareer = "",
  selectedDate = null,
  sortBy = "newest",
  onSelectionChange
}) => {
  const navigate = useNavigate();
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);

  // Filtrar y ordenar encuestas
  const filteredSurveys = useMemo(() => {
    let filtered = surveys.filter(survey => {
      const matchesSearch = searchTerm === "" || 
        survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCareer = selectedCareer === "" || 
        survey.career === selectedCareer;

      const matchesDate = !selectedDate || 
        survey.dateCreated === selectedDate;

      return matchesSearch && matchesCareer && matchesDate;
    });

    // Ordenar según el criterio seleccionado
    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "questions-asc":
        filtered.sort((a, b) => a.sent - b.sent);
        break;
      case "questions-desc":
        filtered.sort((a, b) => b.sent - a.sent);
        break;
      default:
        filtered.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    }

    return filtered;
  }, [surveys, searchTerm, selectedCareer, selectedDate, sortBy]);

  const handleSelectSurvey = (surveyId: string) => {
    setSelectedSurvey(surveyId);
    onSelectionChange?.(1);
  };

  const handleClearSelection = () => {
    setSelectedSurvey(null);
    onSelectionChange?.(0);
  };

  const handleSendSurvey = () => {
    if (selectedSurvey) {
      console.log("Enviar encuesta:", selectedSurvey);
    }
  };

  const handleDelete = (surveyId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta encuesta?")) {
      console.log("Eliminar encuesta:", surveyId);
    }
  };

  const handleViewMetrics = (surveyId: string) => {
    navigate("/surveys/metrics", {
      state: { formId: surveyId }
    });
  };

  const handleGeneratePDF = (surveyId: string) => {
    console.log("Generar PDF:", surveyId);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8DD2FF]"></div>
          <p className="text-gray-600">Cargando encuestas...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {filteredSurveys.length === 0 ? (
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-12 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                No se encontraron encuestas
              </h3>
              <p className="text-sm text-gray-500">
                Intenta ajustar los filtros para ver más resultados
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <div className="min-w-[1100px]">
              {/* Encabezado */}
              <div className="grid grid-cols-[60px_1.2fr_0.6fr_70px_90px_90px_90px_80px_80px] gap-4 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold py-4 px-6 text-xs uppercase tracking-wider items-center border-b border-gray-200">
                <div className="text-center">
                  <span className="text-[10px] text-gray-500">Seleccionar</span>
                </div>
                <div className="pl-2">Nombre de la encuesta</div>
                <div className="text-center">Carrera</div>
                <div className="text-center">Fecha</div>
                <div className="text-center">Enviadas</div>
                <div className="text-center">Respondidas</div>
                <div className="text-center">Sin responder</div>
                <div className="text-center">Acciones</div>
                <div className="text-center">Reenvío</div>
              </div>

              {/* Filas */}
              {filteredSurveys.map((survey) => (
                <div
                  key={survey.id}
                  className={`grid grid-cols-[60px_1.2fr_0.6fr_70px_90px_90px_90px_80px_80px] gap-4 items-center border-b border-gray-100 py-4 px-6 text-sm transition-all duration-200 ${
                    selectedSurvey === survey.id
                      ? "bg-[#8DD2FF]/10 border-l-4 border-l-[#8DD2FF]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="survey-selection"
                      checked={selectedSurvey === survey.id}
                      onChange={() => handleSelectSurvey(survey.id)}
                      className="w-4 h-4 accent-[#8DD2FF] cursor-pointer"
                    />
                  </div>

                  <div className="pl-2">
                    <div className="font-semibold text-gray-900 truncate" title={survey.title}>
                      {survey.title}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-gray-600 text-sm">
                      {survey.career}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-gray-600 text-sm">
                      {new Date(survey.dateCreated).toLocaleDateString('es-ES')}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 text-xs font-bold">
                      {survey.sent}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <span className="px-3 py-1.5 rounded-lg border border-green-300 bg-green-50 text-green-600 font-bold text-xs">
                      {survey.responded}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <span className="px-3 py-1.5 rounded-lg border border-red-300 bg-red-50 text-red-500 font-bold text-xs">
                      {survey.notResponded}
                    </span>
                  </div>

                  <div className="flex justify-center items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <MenuButton className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </MenuButton>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in focus:outline-none"
                      >
                        <div className="py-1">
                          <MenuItem>
                            {({ focus }) => (
                              <button
                                onClick={() => handleViewMetrics(survey.id)}
                                className={`${
                                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex items-center w-full px-4 py-2 text-sm transition-colors`}
                              >
                                <BarChart3 className="mr-3 h-4 w-4 text-gray-400 group-hover:text-[#6BB8E6]" />
                                Ver métricas
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <button
                                onClick={() => handleGeneratePDF(survey.id)}
                                className={`${
                                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex items-center w-full px-4 py-2 text-sm transition-colors`}
                              >
                                <Pencil className="mr-3 h-4 w-4 text-gray-400 group-hover:text-[#6BB8E6]" />
                                Generar PDF
                              </button>
                            )}
                          </MenuItem>
                        </div>

                        <div className="border-t border-gray-100 py-1">
                          <MenuItem>
                            {({ focus }) => (
                              <button
                                onClick={() => handleDelete(survey.id)}
                                className={`${
                                  focus ? 'bg-red-50 text-red-700' : 'text-red-600'
                                } group flex items-center w-full px-4 py-2 text-sm transition-colors`}
                              >
                                <Trash2 className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-600" />
                                Eliminar
                              </button>
                            )}
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>

                  <div className="text-center">
                    <button className="text-blue-600 hover:text-blue-700 hover:underline font-semibold text-sm transition-colors">
                      ¿Reenviar?
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Botones flotantes */}
      {selectedSurvey && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
          <button
            onClick={handleClearSelection}
            className="flex items-center justify-center w-12 h-12 bg-white text-gray-600 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 group"
            title="Cancelar selección"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <button
            onClick={handleSendSurvey}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#8DD2FF] to-[#6BB8E6] text-white rounded-2xl shadow-2xl hover:shadow-[#8DD2FF]/50 hover:scale-105 transition-all duration-300 font-semibold text-base group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>Enviar encuesta</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Table;
