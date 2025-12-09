import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Question } from '@/features/question/domain/entities/Question';
import { QuestionOption } from '@/features/question/domain/entities/QuestionOption';
import { useFormQuestions } from '../hooks/useFormQuestions';
import type { Pregunta } from '@/shared/types';

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  formId?: string;
  preloadedQuestions?: Pregunta[];
}

export const FormPreviewModal = ({
  isOpen,
  onClose,
  title,
  description,
  formId,
  preloadedQuestions
}: FormPreviewModalProps) => {
  const { questions: fetchedQuestions, isLoading: isLoadingQuestions } = useFormQuestions(formId || '');
  const [displayQuestions, setDisplayQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (preloadedQuestions && preloadedQuestions.length > 0) {
      // Map Pregunta to Question
      const mappedQuestions = preloadedQuestions.map(p => new Question(
        p.id,
        p.texto,
        p.requerida,
        p.tipoPreguntaId,
        p.opciones?.map(o => new QuestionOption(o.id, o.texto, o.etiqueta || '', p.id))
      ));
      setDisplayQuestions(mappedQuestions);
    } else if (formId) {
      setDisplayQuestions(fetchedQuestions);
    }
  }, [preloadedQuestions, formId, fetchedQuestions]);

  if (!isOpen) return null;

  const isLoading = formId && !preloadedQuestions && isLoadingQuestions;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop - Más transparente para ver el fondo */}
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8DD2FF]"></div>
              </div>
            ) : displayQuestions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Este formulario no tiene preguntas aún
              </div>
            ) : (
              <div className="space-y-6">
                {displayQuestions.map((question, index) => (
                  <QuestionPreviewItem
                    key={question.id}
                    question={question}
                    index={index + 1}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#8DD2FF] hover:bg-[#7BC1EE] rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestionPreviewItem = ({ question, index }: { question: Question; index: number }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8DD2FF] text-white text-sm font-medium flex items-center justify-center">
          {index}
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            {question.textoPregunta}
            {question.esObligatoria && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </p>

          {/* Mostrar opciones si existen */}
          {question.opciones && question.opciones.length > 0 && (
            <div className="mt-3 space-y-2">
              {question.opciones.map((opcion) => (
                <div key={opcion.id} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-600">
                    {opcion.etiqueta}. {opcion.textoOpcion}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};