import { XMarkIcon } from '@heroicons/react/24/outline';

interface QuestionDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  questionText?: string;
}

export const QuestionDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  questionText,
}: QuestionDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden border border-red-200">
          <div className="sticky top-0 bg-white border-b border-red-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-red-700">Eliminar pregunta</h3>
              <p className="text-sm text-red-500 mt-1">Esta acción no se puede deshacer</p>
            </div>
            <button
              onClick={onClose}
              className="text-red-300 hover:text-red-500 transition-colors"
              disabled={isSubmitting}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="px-6 py-6 bg-red-50 text-red-700">
            <p className="text-base font-medium">¿Estás seguro de borrar la pregunta?</p>
            {questionText && (
              <p className="text-sm text-red-600 mt-2">"{questionText}"</p>
            )}
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-70"
            >
              No estoy seguro
            </button>
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Eliminando...' : 'Sí, borrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
