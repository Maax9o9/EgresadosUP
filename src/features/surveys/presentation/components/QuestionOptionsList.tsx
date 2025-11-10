// ============================================
// COMPONENT - Question Options List
// ============================================

import { TrashIcon } from '@heroicons/react/24/outline';
import type { OpcionPregunta, TipoPregunta } from '@/shared/types';

interface QuestionOptionsListProps {
  questionType: TipoPregunta;
  options: OpcionPregunta[];
  onOptionChange: (optionId: string, text: string) => void;
  onOptionDelete: (optionId: string) => void;
  onOptionAdd: () => void;
}

export const QuestionOptionsList = ({
  questionType,
  options,
  onOptionChange,
  onOptionDelete,
  onOptionAdd,
}: QuestionOptionsListProps) => {
  if (questionType !== 'multiple' && questionType !== 'checkbox') {
    return null;
  }

  const getOptionIcon = () => {
    if (questionType === 'multiple') {
      return <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-400 bg-white" />;
    }
    return <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-400 bg-white" />;
  };

  return (
    <div className="space-y-3 mb-6">
      {options.map((option, idx) => (
        <div key={option.id} className="flex items-center gap-4 group">
          {getOptionIcon()}
          <input
            type="text"
            value={option.texto}
            onChange={(e) => onOptionChange(option.id, e.target.value)}
            className="flex-1 text-base text-gray-700 border-0 border-b border-gray-200 hover:border-gray-300 focus:border-[#8DD2FF] focus:outline-none placeholder-gray-400 px-0 py-2 transition-all duration-300 bg-transparent"
            placeholder={`Opción ${idx + 1}`}
          />
          {options.length > 2 && (
            <button
              onClick={() => onOptionDelete(option.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all p-1"
              title="Eliminar opción"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={onOptionAdd}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8DD2FF] transition-colors px-1 py-2 hover:bg-gray-50 rounded-md -ml-1"
      >
        {getOptionIcon()}
        <span>Agregar opción</span>
      </button>
    </div>
  );
};
