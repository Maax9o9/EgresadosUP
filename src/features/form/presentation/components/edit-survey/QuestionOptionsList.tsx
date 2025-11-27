import { TrashIcon } from '@heroicons/react/24/outline';
import type { OpcionPregunta } from '@/shared/types';

interface QuestionOptionsListProps {
  options: OpcionPregunta[];
  questionType?: string;
  onOptionChange: (optionId: string, text: string) => void;
  onOptionDelete: (optionId: string) => void;
  onOptionAdd: () => void;
}

export const QuestionOptionsList = ({
  options,
  questionType = '',
  onOptionChange,
  onOptionDelete,
  onOptionAdd,
}: QuestionOptionsListProps) => {
  const isLikert = questionType.toLowerCase().includes('likert');
  const isBoolean = questionType.toLowerCase().includes('boolean');
  const canAddOrDelete = !isLikert && !isBoolean;

  return (
    <div className="space-y-3 mb-6">
      {options.map((option, index) => (
        <div key={option.id} className="flex items-center gap-4 group/option">
          <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-400 bg-white" />
          <span className="flex-shrink-0 text-sm font-medium text-gray-500 w-6">
            {option.etiqueta || String.fromCharCode(65 + index)}
          </span>
          <input
            type="text"
            value={option.texto}
            onChange={(e) => onOptionChange(option.id, e.target.value)}
            disabled={isLikert}
            className={`flex-1 text-base text-gray-700 border-0 border-b border-gray-200 hover:border-gray-300 focus:border-[#8DD2FF] focus:outline-none placeholder-gray-400 px-0 py-2 transition-all duration-300 bg-transparent ${
              isLikert ? 'cursor-not-allowed opacity-60' : ''
            }`}
            placeholder={`Opción ${index + 1}`}
          />
          {canAddOrDelete && options.length > 2 && (
            <button
              onClick={() => onOptionDelete(option.id)}
              className="opacity-0 group-hover/option:opacity-100 text-gray-400 hover:text-red-600 transition-all p-1"
              title="Eliminar opción"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
      {canAddOrDelete && (
        <button
          onClick={onOptionAdd}
          className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#8DD2FF] transition-colors px-1 py-2 hover:bg-gray-50 rounded-md -ml-1"
        >
          <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-dashed border-gray-400 bg-white flex items-center justify-center">
            <span className="text-xs text-gray-400">+</span>
          </div>
          <span className="font-medium">Agregar opción</span>
        </button>
      )}
    </div>
  );
};
