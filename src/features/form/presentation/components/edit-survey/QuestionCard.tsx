import { TrashIcon } from '@heroicons/react/24/outline';
import type { Pregunta } from '@/shared/types';
import { QuestionTypeSelector } from './QuestionTypeSelector';
import { QuestionOptionsList } from './QuestionOptionsList';
import { QuestionPreview } from './QuestionPreview';
import { ToggleSwitch } from '@/shared/components/ui/ToggleSwitch';

interface QuestionCardProps {
  question: Pregunta;
  index: number;
  questionTypes: Array<{ id: string; nombre: string }>;
  onQuestionChange: (id: string, text: string) => void;
  onQuestionTypeChange: (id: string, newTypeId: string) => void;
  onQuestionDelete: () => void;
  onRequiredToggle: (id: string, required: boolean) => void;
  onOptionAdd: (questionId: string) => void;
  onOptionChange: (questionId: string, optionId: string, text: string) => void;
  onOptionDelete: (questionId: string, optionId: string) => void;
}

export const QuestionCard = ({
  question,
  questionTypes,
  onQuestionChange,
  onQuestionTypeChange,
  onQuestionDelete,
  onRequiredToggle,
  onOptionAdd,
  onOptionChange,
  onOptionDelete,
}: QuestionCardProps) => {
  const currentType = questionTypes.find(qt => qt.id === question.tipoPreguntaId);

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4 sm:mb-6">
          <input
            type="text"
            value={question.texto}
            onChange={(e) => onQuestionChange(question.id, e.target.value)}
            className="flex-1 text-base sm:text-lg text-gray-900 border-0 border-b border-gray-300 focus:border-[#8DD2FF] focus:outline-none placeholder-gray-400 px-0 pb-2 transition-all duration-300 bg-transparent"
            placeholder="Pregunta sin título"
          />
          <div className="flex-shrink-0 w-full lg:w-64">
            <QuestionTypeSelector
              value={question.tipoPreguntaId}
              onChange={(newTypeId) => onQuestionTypeChange(question.id, newTypeId)}
            />
          </div>
        </div>

        {question.opciones && question.opciones.length > 0 && (
          <QuestionOptionsList
            options={question.opciones}
            questionType={currentType?.nombre || ''}
            onOptionChange={(optionId, text) => onOptionChange(question.id, optionId, text)}
            onOptionDelete={(optionId) => onOptionDelete(question.id, optionId)}
            onOptionAdd={() => onOptionAdd(question.id)}
          />
        )}

        <QuestionPreview question={question} questionTypes={questionTypes} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
          <ToggleSwitch
            label="Obligatoria"
            enabled={question.requerida}
            onChange={(enabled) => onRequiredToggle(question.id, enabled)}
          />
          <button
            onClick={onQuestionDelete}
            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto"
          >
            <TrashIcon className="h-4 w-4" />
            <span className="font-medium">Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
