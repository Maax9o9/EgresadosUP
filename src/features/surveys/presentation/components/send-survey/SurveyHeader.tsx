// ============================================
// COMPONENT - Survey Header for Send View
// ============================================

interface SurveyHeaderProps {
  title: string;
  description: string;
  questionsCount: number;
}

export const SurveyHeader = ({
  title,
  description,
  questionsCount,
}: SurveyHeaderProps) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 sm:p-8 space-y-4">
        {/* Título y Badge de Reactivos */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            {title || "Encuesta sin título"}
          </h1>
          
          <div className="inline-flex items-center justify-center bg-[#8DD2FF] text-white rounded-lg px-5 py-2.5 shadow-sm shrink-0">
            <span className="text-sm font-medium">
              Reactivos: {questionsCount}
            </span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-lg sm:text-xl text-gray-400 font-semibold">
          {description || "Descripción..."}
        </p>
      </div>
    </div>
  );
};
