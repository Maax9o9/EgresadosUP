import { useState, useMemo, type FunctionComponent } from "react";
import { Send, Trash2, Pencil, Eye, MoreVertical, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ROUTES } from "@/shared/constants/route";

interface Survey {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  questions: number;
  category: string;
}

// Props actualizadas para recibir datos del filtro mejorado
interface CatalogTableProps {
  searchTerm?: string;
  selectedCategory?: string;
  selectedDate?: string | null; // Cambiado de dateRange a selectedDate
  sortBy?: string; // Nueva prop para ordenamiento
  onSelectionChange?: (count: number) => void;
}

const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Encuesta de Satisfacción 2025",
    description: "Evaluación de satisfacción de empleados para el primer trimestre del año",
    createdAt: "2025-10-21",
    questions: 30,
    category: "satisfaccion"
  },
  {
    id: "2",
    title: "Clima Laboral - Departamento TI",
    description: "Medición del ambiente de trabajo y relaciones interpersonales en el equipo de tecnología",
    createdAt: "2025-10-15",
    questions: 25,
    category: "clima"
  },
  {
    id: "3",
    title: "Evaluación de Desempeño Q3",
    description: "Evaluación trimestral de objetivos y competencias del tercer trimestre",
    createdAt: "2025-10-10",
    questions: 20,
    category: "evaluacion"
  },
  {
    id: "4",
    title: "Capacitación en Liderazgo",
    description: "Encuesta de retroalimentación sobre el programa de capacitación en liderazgo organizacional",
    createdAt: "2025-11-05",
    questions: 15,
    category: "capacitacion"
  },
  {
    id: "5",
    title: "Satisfacción con Beneficios",
    description: "Evaluación de la percepción de los empleados sobre el paquete de beneficios corporativos",
    createdAt: "2025-11-08",
    questions: 18,
    category: "satisfaccion"
  },
  {
    id: "6",
    title: "Clima Organizacional General",
    description: "Encuesta anual de clima organizacional para todos los departamentos de la empresa",
    createdAt: "2025-09-20",
    questions: 40,
    category: "clima"
  },
  {
    id: "7",
    title: "Evaluación 360° Gerentes",
    description: "Evaluación de competencias gerenciales desde múltiples perspectivas",
    createdAt: "2025-11-01",
    questions: 35,
    category: "evaluacion"
  },
  {
    id: "8",
    title: "Programa de Onboarding",
    description: "Retroalimentación de nuevos empleados sobre su experiencia durante el proceso de integración",
    createdAt: "2025-10-28",
    questions: 12,
    category: "capacitacion"
  },
];

const CatalogTable: FunctionComponent<CatalogTableProps> = ({ 
  searchTerm = "",
  selectedCategory = "",
  selectedDate = null, // Actualizado
  sortBy = "newest", // Nueva prop con valor por defecto
  onSelectionChange
}) => {
  const navigate = useNavigate();
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);

  // Filtrar y ordenar encuestas
  const filteredSurveys = useMemo(() => {
    // Primero filtrar
    let filtered = mockSurveys.filter(survey => {
      const matchesSearch = searchTerm === "" || 
        survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "" || 
        survey.category === selectedCategory;

      // Filtro por fecha exacta (no rango)
      const matchesDate = !selectedDate || 
        survey.createdAt === selectedDate;

      return matchesSearch && matchesCategory && matchesDate;
    });

    // Luego ordenar según el criterio seleccionado
    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "questions-asc":
        filtered.sort((a, b) => a.questions - b.questions);
        break;
      case "questions-desc":
        filtered.sort((a, b) => b.questions - a.questions);
        break;
      default:
        // Por defecto más recientes
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedDate, sortBy]); // Dependencias actualizadas

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
      const survey = filteredSurveys.find(s => s.id === selectedSurvey);
      navigate(ROUTES.SURVEY_SEND, { 
        state: { 
          survey: {
            id: survey?.id,
            title: survey?.title,
            description: survey?.description,
            questions: survey?.questions,
          }
        } 
      });
    }
  };

  const handleEdit = (surveyId: string) => {
    console.log("Editar encuesta:", surveyId);
  };

  const handleDelete = (surveyId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta encuesta?")) {
      console.log("Eliminar encuesta:", surveyId);
    }
  };

  const handlePreview = (surveyId: string) => {
    console.log("Vista previa:", surveyId);
  };

  const handleDuplicate = (surveyId: string) => {
    console.log("Duplicar encuesta:", surveyId);
  };

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
            <div className="min-w-[1200px]">
              {/* Encabezado */}
              <div className="grid grid-cols-[60px_1.5fr_2.5fr_140px_110px_100px] gap-4 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold py-4 px-6 text-xs uppercase tracking-wider items-center border-b border-gray-200">
                <div className="text-center">
                  <span className="text-[10px] text-gray-500">Seleccionar</span>
                </div>
                <div className="pl-2">Título</div>
                <div className="pl-2">Descripción</div>
                <div className="text-center">Fecha</div>
                <div className="text-center">Preguntas</div>
                <div className="text-center">Acciones</div>
              </div>

              {/* Filas */}
              {filteredSurveys.map((survey) => (
                <div
                  key={survey.id}
                  className={`grid grid-cols-[60px_1.5fr_2.5fr_140px_110px_100px] gap-4 items-center border-b border-gray-100 py-4 px-6 text-sm transition-all duration-200 ${
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

                  <div className="font-semibold text-gray-900 pl-2 truncate" title={survey.title}>
                    {survey.title}
                  </div>

                  <div className="text-gray-600 text-sm leading-relaxed pl-2 line-clamp-2" title={survey.description}>
                    {survey.description}
                  </div>

                  <div className="text-gray-500 text-sm text-center whitespace-nowrap">
                    {new Date(survey.createdAt).toLocaleDateString('es-ES')}
                  </div>

                  <div className="flex justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#8DD2FF]/20 to-[#6BB8E6]/20 text-[#6BB8E6] text-xs font-bold min-w-[50px] text-center">
                      {survey.questions}
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
                                onClick={() => handlePreview(survey.id)}
                                className={`${
                                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex items-center w-full px-4 py-2 text-sm transition-colors`}
                              >
                                <Eye className="mr-3 h-4 w-4 text-gray-400 group-hover:text-[#6BB8E6]" />
                                Vista previa
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <button
                                onClick={() => handleEdit(survey.id)}
                                className={`${
                                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex items-center w-full px-4 py-2 text-sm transition-colors`}
                              >
                                <Pencil className="mr-3 h-4 w-4 text-gray-400 group-hover:text-[#6BB8E6]" />
                                Editar
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <button
                                onClick={() => handleDuplicate(survey.id)}
                                className={`${
                                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex items-center w-full px-4 py-2 text-sm transition-colors`}
                              >
                                <svg className="mr-3 h-4 w-4 text-gray-400 group-hover:text-[#6BB8E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Duplicar
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

export default CatalogTable;
