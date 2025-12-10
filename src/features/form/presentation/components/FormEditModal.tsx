import { useEffect, useState } from 'react';
import { XMarkIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useFormQuestions } from '../hooks/useFormQuestions';
import { useUpdateQuestionOption } from '../hooks/useUpdateQuestionOption';
import { alertService } from '@/shared/services/alert.service';
import { useDeleteQuestion } from '../hooks/useDeleteQuestion';
import { QuestionDeleteModal } from './QuestionDeleteModal';
import type { Pregunta } from '@/shared/types';

interface FormEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  formId?: string;
  preloadedQuestions?: Pregunta[];
}

interface EditableQuestion {
  id: string;
  textoPregunta: string;
  esObligatoria: boolean;
  tipoPreguntaId: string | number;
  opciones: EditableOption[];
  isModified: boolean;
}

interface EditableOption {
  id: string;
  textoOpcion: string;
  etiqueta: string;
  preguntaId: string;
}

export const FormEditModal = ({
  isOpen,
  onClose,
  title,
  description,
  formId,
  preloadedQuestions
}: FormEditModalProps) => {
  const { questions: fetchedQuestions, isLoading: isLoadingQuestions } = useFormQuestions(formId || '');
  const [editableQuestions, setEditableQuestions] = useState<EditableQuestion[]>([]);
  const { deleteQuestion, isDeleting } = useDeleteQuestion();
  const [questionToDelete, setQuestionToDelete] = useState<EditableQuestion | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (preloadedQuestions && preloadedQuestions.length > 0) {
      const mapped = preloadedQuestions.map(p => ({
        id: p.id,
        textoPregunta: p.texto,
        esObligatoria: p.requerida,
        tipoPreguntaId: p.tipoPreguntaId,
        opciones: p.opciones?.map(o => ({
          id: o.id,
          textoOpcion: o.texto,
          etiqueta: o.etiqueta || '',
          preguntaId: p.id
        })) || [],
        isModified: false
      }));
      setEditableQuestions(mapped);
    } else if (formId) {
      const mapped = fetchedQuestions.map(q => ({
        id: q.id,
        textoPregunta: q.textoPregunta,
        esObligatoria: q.esObligatoria,
        tipoPreguntaId: q.tipoPreguntaId,
        opciones: q.opciones?.map(o => ({
          id: o.id,
          textoOpcion: o.textoOpcion,
          etiqueta: o.etiqueta || '',
          preguntaId: q.id
        })) || [],
        isModified: false
      }));
      setEditableQuestions(mapped);
    }
  }, [preloadedQuestions, formId, fetchedQuestions]);

  const handleQuestionChange = (index: number, field: string, value: any) => {
    setEditableQuestions(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
        isModified: field === 'isModified' ? Boolean(value) : true,
      };
      return updated;
    });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, field: string, value: any) => {
    setEditableQuestions(prev => {
      const updated = [...prev];
      updated[questionIndex].opciones[optionIndex] = {
        ...updated[questionIndex].opciones[optionIndex],
        [field]: value
      };
      updated[questionIndex].isModified = true;
      return updated;
    });
  };

  const handleOpenDeleteQuestion = (question: EditableQuestion) => {
    setQuestionToDelete(question);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteQuestion = () => {
    setShowDeleteModal(false);
    setQuestionToDelete(null);
  };

  const handleConfirmDeleteQuestion = async () => {
    if (!questionToDelete) return;
    try {
      await deleteQuestion(questionToDelete.id);
      setEditableQuestions(prev => prev.filter(q => q.id !== questionToDelete.id));
      alertService.success('Pregunta eliminada');
    } catch (error: any) {
      alertService.error(error?.message || 'Error al eliminar la pregunta');
    } finally {
      handleCloseDeleteQuestion();
    }
  };

  if (!isOpen) return null;

  const isLoading = formId && !preloadedQuestions && isLoadingQuestions;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
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
              ) : editableQuestions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Este formulario no tiene preguntas aún
                </div>
              ) : (
                <div className="space-y-6">
                  {editableQuestions.map((question, index) => (
                    <QuestionEditItem
                      key={question.id}
                      question={question}
                      index={index + 1}
                      onQuestionChange={(field, value) => handleQuestionChange(index, field, value)}
                      onOptionChange={(optionIndex, field, value) => handleOptionChange(index, optionIndex, field, value)}
                      onDeleteClick={() => handleOpenDeleteQuestion(question)}
                      isDeleting={isDeleting && questionToDelete?.id === question.id}
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

      {questionToDelete && (
        <QuestionDeleteModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteQuestion}
          onConfirm={handleConfirmDeleteQuestion}
          isSubmitting={isDeleting}
          questionText={questionToDelete.textoPregunta}
        />
      )}
    </>
  );
};

const QuestionEditItem = ({ 
  question, 
  index, 
  onQuestionChange, 
  onOptionChange,
  onDeleteClick,
  isDeleting
}: { 
  question: EditableQuestion; 
  index: number;
  onQuestionChange: (field: string, value: any) => void;
  onOptionChange: (optionIndex: number, field: string, value: any) => void;
  onDeleteClick: () => void;
  isDeleting?: boolean;
}) => {
  const { updateQuestionOption } = useUpdateQuestionOption();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      // Solo actualizar las opciones que fueron modificadas (solo el texto)
      for (let i = 0; i < question.opciones.length; i++) {
        const opcion = question.opciones[i];
        await updateQuestionOption({
          id: opcion.id,
          textoOpcion: opcion.textoOpcion,
          etiqueta: opcion.etiqueta // mantener la etiqueta original
        });
      }

      // Marcar pregunta como no modificada y alertar una sola vez
      onQuestionChange('isModified', false);
      alertService.success('Cambios guardados');
    } catch (error) {
      alertService.error('Error al guardar cambios');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex gap-3 mb-4">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8DD2FF] text-white text-sm font-medium flex items-center justify-center">
          {index}
        </span>
        <div className="flex-1">
          {/* Campo editable del texto de la pregunta */}
          <input
            type="text"
            value={question.textoPregunta}
            onChange={(e) => onQuestionChange('textoPregunta', e.target.value)}
            className="w-full text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#8DD2FF] focus:ring-1 focus:ring-[#8DD2FF]"
            placeholder="Texto de la pregunta"
          />

          {/* Checkbox para obligatoria */}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={question.esObligatoria}
              onChange={(e) => onQuestionChange('esObligatoria', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#8DD2FF] focus:ring-[#8DD2FF]"
            />
            <span className="text-sm text-gray-600">Pregunta obligatoria</span>
          </label>
        </div>
      </div>

      {/* Opciones */}
      {question.opciones && question.opciones.length > 0 && (
        <div className="mt-4 space-y-3 ml-9">
          {question.opciones.map((opcion, optionIndex) => (
            <div key={opcion.id} className="bg-white rounded p-3 border border-gray-200">
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Etiqueta: <span className="font-bold text-gray-900">{opcion.etiqueta}</span>
                  </label>
                  <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
                    Las etiquetas no se pueden editar
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Texto de la opción
                  </label>
                  <input
                    type="text"
                    value={opcion.textoOpcion}
                    onChange={(e) => onOptionChange(optionIndex, 'textoOpcion', e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#8DD2FF] focus:ring-1 focus:ring-[#8DD2FF]"
                    placeholder="Texto de la opción"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botones de acción */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onDeleteClick}
          disabled={isSaving || isDeleting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-60"
        >
          <TrashIcon className="h-4 w-4" />
          {isDeleting ? 'Eliminando...' : 'Eliminar pregunta'}
        </button>
        <button
          onClick={handleSaveClick}
          disabled={!question.isModified || isSaving}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            question.isModified && !isSaving
              ? 'bg-[#8DD2FF] text-white hover:bg-[#7BC1EE]'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          <CheckIcon className="h-4 w-4" />
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
};
