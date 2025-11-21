// ============================================
// COMPONENT - Question Card
// ============================================

import { TrashIcon } from '@heroicons/react/24/outline';
import type { Pregunta, TipoPregunta } from '@/shared/types';
import { QuestionTypeSelector } from './QuestionTypeSelector';
import { QuestionOptionsList } from './QuestionOptionsList';
import { ScaleLinearPreview } from './ScaleLinearPreview';
import { ToggleSwitch } from '@/shared/components/ui/ToggleSwitch';

interface QuestionCardProps {
  question: Pregunta;
  index: number;
  onQuestionChange: (id: string, text: string) => void;
  onQuestionTypeChange: (id: string, newType: TipoPregunta) => void;
  onQuestionDelete: (id: string) => void;
  onRequiredToggle: (id: string, required: boolean) => void;
  onOptionAdd: (questionId: string) => void;
  onOptionChange: (questionId: string, optionId: string, text: string) => void;
  onOptionDelete: (questionId: string, optionId: string) => void;
}

export const QuestionCard = ({
  question,
  onQuestionChange,
  onQuestionTypeChange,
  onQuestionDelete,
  onRequiredToggle,
  onOptionAdd,
  onOptionChange,
  onOptionDelete,
}: QuestionCardProps) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header: Question title input + Type Selector */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4 sm:mb-6">
          <input
            type="text"
            value={question.texto}
            onChange={(e) => onQuestionChange(question.id, e.target.value)}
            className="flex-1 text-base sm:text-lg text-gray-900 border-0 border-b border-gray-300 focus:border-[#8DD2FF] focus:outline-none placeholder-gray-400 px-0 pb-2 transition-all duration-300 bg-transparent"
            placeholder={`Pregunta sin título`}
          />
          <div className="flex-shrink-0 w-full lg:w-64">
            <QuestionTypeSelector
              value={question.tipo}
              onChange={(newType) => onQuestionTypeChange(question.id, newType)}
            />
          </div>
        </div>

        {/* Options List (only for multiple/checkbox) */}
        <QuestionOptionsList
          questionType={question.tipo}
          options={question.opciones || []}
          onOptionChange={(optionId, text) => onOptionChange(question.id, optionId, text)}
          onOptionDelete={(optionId) => onOptionDelete(question.id, optionId)}
          onOptionAdd={() => onOptionAdd(question.id)}
        />

        {/* Scale Preview (only for escala) */}
        {question.tipo === 'escala' && <ScaleLinearPreview />}

        {/* Abierta type preview */}
        {question.tipo === 'abierta' && (
          <div className="mb-4">
            <div className="w-full max-w-md border-0 border-b border-gray-300 py-3 text-gray-400 text-sm">
              Respuesta de texto corto
            </div>
          </div>
        )}

        {/* Footer: Required toggle + Delete button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
          <ToggleSwitch
            label="Obligatoria"
            enabled={question.requerida}
            onChange={(enabled) => onRequiredToggle(question.id, enabled)}
          />
          <button
            onClick={() => onQuestionDelete(question.id)}
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
