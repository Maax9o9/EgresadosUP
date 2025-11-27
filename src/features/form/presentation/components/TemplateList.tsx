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
import { ROUTES } from '@/shared/constants/route';
import { FormPreviewModal } from './FormPreviewModal';
import { useFormList } from '../hooks/useFormList';
import { useFormById } from '../hooks/useFormById';
import { useUpdateForm } from '../hooks/useUpdateForm';
import { Form } from '../../domain/entities/Form';

export const TemplateList = () => {
  const navigate = useNavigate();
  const { forms, isLoading, refetch, error } = useFormList();
  const { updateForm } = useUpdateForm();
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const { form: selectedForm } = useFormById(selectedFormId);

  const handlePreview = (form: Form) => {
    setSelectedFormId(form.id);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedFormId(null);
  };

 const handleUseTemplate = (form: Form) => {
  navigate(ROUTES.SURVEY_EDITOR, { 
    state: { 
      formId: form.id
    } 
  });
};

  const toggleActivo = async (form: Form) => {
    try {
      await updateForm({
        id: form.id,
        titulo: form.titulo,
        descripcion: form.descripcion,
        isActive: !form.isActive
      });
      alertService.success(
        `Formulario "${form.titulo}" ${!form.isActive ? 'activado' : 'desactivado'}`
      );
      refetch();
    } catch (error) {
      alertService.error('Error al actualizar el formulario');
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Cargando formularios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-red-600">Error al cargar formularios</div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#8DD2FF] text-white rounded-lg hover:bg-[#7BC1EE]"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
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

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="py-4 pl-6 pr-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                  Creado
                </th>
                <th className="px-3 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium mb-2">No hay formularios disponibles</p>
                      <p className="text-sm">Crea tu primer formulario para empezar</p>
                    </div>
                  </td>
                </tr>
              ) : (
                forms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 pl-6 pr-3 whitespace-nowrap">
                      <button
                        onClick={() => toggleActivo(form)}
                        className="focus:outline-none group"
                        title={form.isActive ? 'Desactivar' : 'Activar'}
                      >
                        {form.isActive ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-500 group-hover:text-green-600 transition-colors" />
                        ) : (
                          <XCircleIcon className="h-6 w-6 text-red-400 group-hover:text-red-500 transition-colors" />
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {form.titulo}
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm text-gray-600 max-w-md truncate">
                        {form.descripcion}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                      {form.fechaCreacion && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4" />
                          {formatFecha(form.fechaCreacion)}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handlePreview(form)}
                          className="p-2 text-gray-600 hover:text-[#8DD2FF] hover:bg-blue-50 rounded-lg transition-all"
                          title="Vista previa"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleUseTemplate(form)}
                          disabled={!form.isActive}
                          className="px-4 py-2 text-sm font-medium text-white bg-[#8DD2FF] hover:bg-[#7BC1EE] rounded-lg transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Usar este formulario"
                        >
                          Usar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FormPreviewModal
        isOpen={showPreview}
        onClose={handleClosePreview}
        title={selectedForm?.titulo || ''}
        description={selectedForm?.descripcion || ''}
        questionIds={selectedForm?.preguntas?.map(p => p.id) || []}
      />
    </>
  );
};
