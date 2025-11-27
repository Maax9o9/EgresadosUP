import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useQuestionTypes } from '@/features/questionType/presentation/hooks/useQuestionTypes';

interface QuestionTypeSelectorProps {
  value: string; 
  onChange: (typeId: string) => void;
}

export const QuestionTypeSelector = ({ value, onChange }: QuestionTypeSelectorProps) => {
  const { questionTypes, isLoading } = useQuestionTypes();

  if (isLoading) {
    return (
      <div className="w-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-2.5 text-sm text-gray-400">
        Cargando tipos...
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full rounded-lg bg-white border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-[#8DD2FF] focus:ring-2 focus:ring-[#8DD2FF]/20 cursor-pointer transition-all duration-300"
      >
        {questionTypes.map((qt) => (
          <option key={qt.id} value={qt.id}>
            {qt.nombre}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );
};
