// ============================================
// COMPONENT - Survey Preview Modal
// ============================================

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Pregunta } from '@/shared/types';

interface SurveyPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  questions: Pregunta[];
}

export const SurveyPreviewModal = ({
  isOpen,
  onClose,
  title,
  description,
  questions,
}: SurveyPreviewModalProps) => {
  const renderQuestionPreview = (question: Pregunta, index: number) => {
    return (
      <div key={question.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex items-start gap-2 mb-4">
          <span className="text-sm sm:text-base font-medium text-gray-900">
            {index + 1}. {question.texto || 'Pregunta sin título'}
          </span>
          {question.requerida && (
            <span className="text-red-500 text-sm">*</span>
          )}
        </div>

        {/* Respuesta corta */}
        {question.tipo === 'abierta' && (
          <input
            type="text"
            disabled
            className="w-full max-w-md border-0 border-b border-gray-300 py-2 text-sm text-gray-500 cursor-not-allowed bg-transparent"
            placeholder="Respuesta de texto corto"
          />
        )}

        {/* Opción múltiple */}
        {question.tipo === 'multiple' && (
          <div className="space-y-2">
            {question.opciones?.map((option) => (
              <label key={option.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="radio" name={`question-${question.id}`} disabled className="cursor-not-allowed flex-shrink-0" />
                <span className="text-sm text-gray-700">{option.texto || 'Opción sin texto'}</span>
              </label>
            ))}
          </div>
        )}

        {/* Casillas */}
        {question.tipo === 'checkbox' && (
          <div className="space-y-2">
            {question.opciones?.map((option) => (
              <label key={option.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="checkbox" disabled className="cursor-not-allowed flex-shrink-0" />
                <span className="text-sm text-gray-700">{option.texto || 'Opción sin texto'}</span>
              </label>
            ))}
          </div>
        )}

        {/* Escala lineal */}
        {question.tipo === 'escala' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 my-4">
            <span className="text-sm text-gray-600">1</span>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 w-full">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  disabled
                  className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center cursor-not-allowed"
                >
                  <span className="text-sm text-gray-500">{num}</span>
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-600 hidden sm:inline">5</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-50 shadow-2xl transition-all">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                  <Dialog.Title className="text-base sm:text-lg font-semibold text-gray-900">
                    Vista previa de la encuesta
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
                  <div className="space-y-4 sm:space-y-5">
                    {/* Survey Header */}
                    <div className="bg-white rounded-lg border-t-8 border-[#8DD2FF] p-6 sm:p-8">
                      <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-2">
                        {title || 'Encuesta sin título'}
                      </h2>
                      {description && (
                        <p className="text-sm sm:text-base text-gray-600">{description}</p>
                      )}
                    </div>

                    {/* Questions */}
                    {questions.length > 0 ? (
                      questions.map((question, index) => renderQuestionPreview(question, index))
                    ) : (
                      <div className="text-center py-12 text-gray-500 text-sm sm:text-base">
                        No hay preguntas aún. Agrega algunas para verlas aquí.
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-end">
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
