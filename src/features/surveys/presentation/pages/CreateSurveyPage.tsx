// ============================================
// PAGE - Create Survey Selection
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { ROUTES } from '@/shared/constants/route';
import { TemplateList } from '../components/TemplateList';

export const CreateSurveyPage = () => {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);

  const handleUseTemplate = () => {
    setShowTemplates(true);
  };

  const handleCreateFromScratch = () => {
    navigate(ROUTES.SURVEY_EDITOR, { state: { templateId: null } });
  };

  // Si el usuario seleccionó ver templates, mostrar la lista
  if (showTemplates) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
          <TemplateList />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Nueva Encuesta
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Selecciona una opción para comenzar a diseñar tu encuesta
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Option 1: Use Template */}
          <button
            onClick={handleUseTemplate}
            className="group relative bg-white rounded-lg border border-gray-300 p-6 sm:p-8 hover:border-[#8DD2FF] hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <DocumentTextIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#8DD2FF]" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Usar un formulario existente
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Selecciona una plantilla pre-diseñada del catálogo de formularios. Las preguntas se copiarán y podrás personalizarlas.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#8DD2FF] group-hover:gap-3 transition-all">
                  Explorar formularios
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </button>

          {/* Option 2: Create from Scratch */}
          <button
            onClick={handleCreateFromScratch}
            className="group relative bg-white rounded-lg border border-gray-300 p-6 sm:p-8 hover:border-[#8DD2FF] hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Crear encuesta desde cero
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Diseña una encuesta completamente personalizada. Agrega preguntas y configura cada detalle según tus necesidades.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#8DD2FF] group-hover:gap-3 transition-all">
                  Iniciar editor
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-blue-900 font-medium mb-1">
                Información
              </p>
              <p className="text-sm text-blue-800">
                Las preguntas copiadas desde un formulario existente no afectarán al formulario original. Puedes modificarlas libremente en tu encuesta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
