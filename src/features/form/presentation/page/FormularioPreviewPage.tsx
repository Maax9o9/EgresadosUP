import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getFormularioById } from '@/shared/mocks/formularios.mock';

export default function FormularioPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const formulario = id ? getFormularioById(id) : undefined;

  if (!formulario) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Formulario no encontrado
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            El formulario que buscas no existe o fue eliminado.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#8DD2FF] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#6BB8E6] transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Volver
          </button>
        </div>
      </div>
    );
  }

  const renderPregunta = (pregunta: any, index: number) => {
    return (
      <div key={pregunta.id} className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#8DD2FF] text-white font-semibold">
            {index + 1}
          </span>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {pregunta.texto}
              </h3>
              {pregunta.requerida && (
                <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  Requerida
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Tipo: <span className="font-medium capitalize">{pregunta.tipo}</span>
            </p>

            {/* Opciones (si las tiene) */}
            {pregunta.opciones && pregunta.opciones.length > 0 && (
              <div className="mt-4 space-y-2">
                {pregunta.opciones.map((opcion: any) => (
                  <div
                    key={opcion.id}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    {pregunta.tipo === 'multiple' && (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                    {pregunta.tipo === 'checkbox' && (
                      <div className="h-4 w-4 rounded border-2 border-gray-300" />
                    )}
                    <span>{opcion.texto}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Preview de campo según tipo */}
            {pregunta.tipo === 'abierta' && (
              <div className="mt-4">
                <textarea
                  disabled
                  className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm text-sm"
                  rows={3}
                  placeholder="Respuesta de texto..."
                />
              </div>
            )}

            {pregunta.tipo === 'escala' && (
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    disabled
                    className="h-10 w-10 rounded-full border-2 border-gray-300 bg-gray-50 text-sm font-medium text-gray-700"
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Volver a formularios
        </button>

        <div className="bg-gradient-to-r from-[#8DD2FF] to-[#6BB8E6] rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{formulario.nombre}</h1>
              <p className="mt-2 text-lg opacity-90">{formulario.descripcion}</p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                formulario.activo
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}
            >
              {formulario.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-6 text-sm">
            <span>
              <strong>{formulario.preguntas.length}</strong> pregunta
              {formulario.preguntas.length !== 1 ? 's' : ''}
            </span>
            <span>
              Creado:{' '}
              {new Date(formulario.fechaCreacion).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Preguntas */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Vista previa de preguntas
        </h2>
        {formulario.preguntas
          .sort((a, b) => a.orden - b.orden)
          .map((pregunta, index) => renderPregunta(pregunta, index))}
      </div>
    </div>
  );
}
