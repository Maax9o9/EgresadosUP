import type { Pregunta } from '@/shared/types';
import { ScaleLinearPreview } from './ScaleLinearPreview';

interface QuestionPreviewProps {
  question: Pregunta;
  questionTypes: Array<{ id: string; nombre: string }>;
}

export const QuestionPreview = ({ question, questionTypes }: QuestionPreviewProps) => {
  const tipo = questionTypes.find(qt => qt.id === question.tipoPreguntaId);
  const tipoNombre = tipo?.nombre.toLowerCase() || '';

  if (tipoNombre.includes('abierta')) {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-500 mb-2">
          Vista previa de la respuesta
        </label>
        <input
          type="text"
          disabled
          placeholder="El usuario escribirá su respuesta aquí..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
        />
      </div>
    );
  }

  if (tipoNombre.includes('likert')) {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-500 mb-2">
          Vista previa de la escala
        </label>
        <ScaleLinearPreview />
      </div>
    );
  }

  return null;
};
