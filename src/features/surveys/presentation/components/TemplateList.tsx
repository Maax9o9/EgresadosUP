// ============================================
// COMPONENT - Template List (Formularios)
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  EyeIcon,
  CalendarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { alertService } from '@/shared/services/alert.service';
import { mockFormularios } from '@/shared/mocks/formularios.mock';
import type { Formulario } from '@/shared/types';
import { FormPreviewModal } from '@/features/form/presentation/components/FormPreviewModal';
import { ROUTES } from '@/shared/constants/route';

export const TemplateList = () => {
  const navigate = useNavigate();
  const [formularios, setFormularios] = useState<Formulario[]>(mockFormularios);
  const [selectedFormulario, setSelectedFormulario] = useState<Formulario | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = (formulario: Formulario) => {
    setSelectedFormulario(formulario);
    setShowPreview(true);
  };

  const handleUseTemplate = (formulario: Formulario) => {
    // Navegar al editor con las preguntas del formulario
    navigate(ROUTES.SURVEY_EDITOR, { 
      state: { 
        templateId: formulario.id,
        questions: formulario.preguntas 
      } 
    });
  };

  const toggleActivo = (id: string) => {
    setFormularios((prev) =>
      prev.map((form) =>
        form.id === id ? { ...form, activo: !form.activo } : form
      )
    );
    const formulario = formularios.find((f) => f.id === id);
    if (formulario) {
      alertService.success(
        `Formulario "${formulario.nombre}" ${!formulario.activo ? 'activado' : 'desactivado'}`
      );
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => navigate(ROUTES.SURVEYS_CREATE)}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver a opciones
        </button>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Formularios Disponibles
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Selecciona un formulario para crear una nueva encuesta basada en su estructura
        </p>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th
                  scope="col"
                  className="py-4 pl-6 pr-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden md:table-cell"
                >
                  Creado
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell"
                >
                  Preguntas
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formularios.map((formulario) => (
                <tr
                  key={formulario.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 pl-6 pr-3 whitespace-nowrap">
                    <button
                      onClick={() => toggleActivo(formulario.id)}
                      className="focus:outline-none group"
                      title={formulario.activo ? 'Desactivar' : 'Activar'}
                    >
                      {formulario.activo ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-500 group-hover:text-green-600 transition-colors" />
                      ) : (
                        <XCircleIcon className="h-6 w-6 text-red-400 group-hover:text-red-500 transition-colors" />
                      )}
                    </button>
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {formulario.nombre}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm text-gray-600 max-w-md truncate">
                      {formulario.descripcion}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4" />
                      {formatFecha(formulario.fechaCreacion)}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-center hidden lg:table-cell">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formulario.preguntas.length} pregunta{formulario.preguntas.length !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlePreview(formulario)}
                        className="p-2 text-gray-600 hover:text-[#8DD2FF] hover:bg-blue-50 rounded-lg transition-all"
                        title="Vista previa"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleUseTemplate(formulario)}
                        disabled={!formulario.activo}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#8DD2FF] hover:bg-[#7BC1EE] rounded-lg transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Usar este formulario"
                      >
                        Usar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      <FormPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        formulario={selectedFormulario}
      />
    </>
  );
};
