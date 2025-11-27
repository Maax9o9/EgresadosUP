import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCreateForm } from '../hooks/useCreateForm';
import { alertService } from '@/shared/services/alert.service';

interface CreateFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (formId: string) => void;
}

export const CreateFormDialog = ({ isOpen, onClose, onSuccess }: CreateFormDialogProps) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const { createForm, isCreating } = useCreateForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alertService.error('El título es requerido');
      return;
    }

    try {
      const newForm = await createForm({ 
        titulo: titulo.trim(), 
        descripcion: descripcion.trim(), 
        isActive: true 
      });
      
      alertService.success('Formulario creado exitosamente');
      setTitulo('');
      setDescripcion('');
      onClose();
      onSuccess(newForm.id);
    } catch (error) {
      alertService.error('Error al crear el formulario');
      console.error(error);
    }
  };

  const handleClose = () => {
    setTitulo('');
    setDescripcion('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity"
          onClick={handleClose}
        />

        {/* Dialog */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Crear Nuevo Formulario
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Título */}
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: Encuesta de Satisfacción 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DD2FF] focus:border-transparent"
                  disabled={isCreating}
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe el propósito de este formulario..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DD2FF] focus:border-transparent resize-none"
                  disabled={isCreating}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isCreating}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#8DD2FF] hover:bg-[#7BC1EE] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isCreating}
              >
                {isCreating ? 'Creando...' : 'Crear Formulario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};