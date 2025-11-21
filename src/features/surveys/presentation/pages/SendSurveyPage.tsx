// ============================================
// PAGE - Send Survey
// ============================================

import { useLocation, useNavigate } from "react-router-dom";
import { SurveyHeader } from "../components/send-survey/SurveyHeader";
import { SendTableSurvey } from "../components/send-survey/SendTableSurvey";
import { ROUTES } from "@/shared/constants/route";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export const SendSurveyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener información de la encuesta desde el state de navegación
  const surveyData = location.state?.survey || {
    title: "Encuesta sin título",
    description: "Descripción...",
    questions: 30,
  };

  const handleCancel = () => {
    navigate(ROUTES.SURVEY_CATALOG);
  };

  const handleSend = () => {
    // TODO: Implementar lógica de envío
    console.log("Enviando encuesta...");
    // Aquí irá la lógica para enviar la encuesta a los programas seleccionados
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Botón de regreso */}
        <button
          onClick={handleCancel}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Volver al catálogo</span>
        </button>

        {/* Header de la encuesta */}
        <SurveyHeader
          title={surveyData.title}
          description={surveyData.description}
          questionsCount={surveyData.questions}
        />

        {/* Tabla de selección de programas */}
        <SendTableSurvey />

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-[#8DD2FF] text-white rounded-lg font-medium hover:bg-[#7BC3EF] transition-all duration-200 shadow-sm inline-flex items-center justify-center gap-2"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            <span>Enviar encuesta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
