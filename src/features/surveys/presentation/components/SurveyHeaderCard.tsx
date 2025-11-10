// ============================================
// COMPONENT - Survey Header Card
// ============================================

interface SurveyHeaderCardProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export const SurveyHeaderCard = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: SurveyHeaderCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border-t-8 border-[#8DD2FF] overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="block w-full text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 border-0 border-b border-gray-300 focus:border-[#8DD2FF] focus:outline-none placeholder-gray-400 px-0 pb-2 sm:pb-3 transition-colors duration-300 bg-transparent"
          placeholder="Encuesta sin título"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="block w-full text-sm sm:text-base text-gray-600 border-0 border-b border-transparent focus:border-gray-300 focus:outline-none placeholder-gray-400 px-0 pb-2 transition-colors duration-300 bg-transparent"
          placeholder="Descripción de la encuesta"
        />
      </div>
    </div>
  );
};
