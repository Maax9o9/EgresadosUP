import { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  EyeIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { alertService } from '@/shared/services/alert.service';
import { mockFormularios } from '@/shared/mocks/formularios.mock';
import type { Formulario } from '@/shared/types';
import { FormPreviewModal } from '../components/FormPreviewModal';

export default function FormulariosPage() {
  const [formularios, setFormularios] = useState<Formulario[]>(mockFormularios);
  const [selectedFormulario, setSelectedFormulario] = useState<Formulario | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = (formulario: Formulario) => {
    setSelectedFormulario(formulario);
    setShowPreview(true);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con diseño mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8DD2FF] to-[#6BB8E6] rounded-xl flex items-center justify-center shadow-lg">
              <ClipboardDocumentCheckIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Formularios</h1>
              <p className="text-sm text-gray-500 mt-1">
                {formularios.length} formulario{formularios.length !== 1 ? 's' : ''} disponible{formularios.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <p className="mt-4 text-base text-gray-600 max-w-3xl">
            Gestiona la colección de formularios disponibles para crear encuestas. 
            Activa o desactiva formularios y visualiza su contenido.
          </p>
        </div>

        {/* Tabla mejorada */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
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
                    className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Descripción
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Preguntas
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="relative py-4 pl-3 pr-6"
                  >
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {formularios.map((formulario, index) => (
                  <tr
                    key={formulario.id}
                    className="hover:bg-gradient-to-r hover:from-[#8DD2FF]/5 hover:to-transparent transition-all duration-200 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="whitespace-nowrap py-5 pl-6 pr-3">
                      <button
                        onClick={() => toggleActivo(formulario.id)}
                        className="relative group/toggle focus:outline-none focus:ring-2 focus:ring-[#8DD2FF] focus:ring-offset-2 rounded-lg transition-all"
                        title={
                          formulario.activo
                            ? 'Clic para desactivar'
                            : 'Clic para activar'
                        }
                      >
                        <div className="relative">
                          {formulario.activo ? (
                            <CheckCircleIcon className="h-7 w-7 text-green-500 group-hover/toggle:text-green-600 transition-colors drop-shadow-sm" />
                          ) : (
                            <XCircleIcon className="h-7 w-7 text-gray-300 group-hover/toggle:text-gray-400 transition-colors" />
                          )}
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-[#6BB8E6] transition-colors">
                          {formulario.nombre}
                        </span>
                        {formulario.activo && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            Activo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-5 max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {formulario.descripcion}
                      </p>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#8DD2FF] to-[#6BB8E6] text-white text-sm font-bold shadow-md">
                        {formulario.preguntas.length}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        <span>{formatFecha(formulario.fechaCreacion)}</span>
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-6 text-right">
                      <button
                        onClick={() => handlePreview(formulario)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#8DD2FF] to-[#6BB8E6] text-white font-medium hover:from-[#6BB8E6] hover:to-[#8DD2FF] transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span className="text-sm">Vista previa</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state mejorado */}
        {formularios.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-xl border border-gray-200">
            <ClipboardDocumentCheckIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay formularios disponibles
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Aún no se han creado formularios. Comienza creando tu primer formulario para gestionar encuestas.
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <FormPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        formulario={selectedFormulario}
      />
    </div>
  );
}
