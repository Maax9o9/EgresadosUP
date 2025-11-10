// ============================================
// ALERT DEMO - Component para probar alertas
// ============================================
// Este componente es solo para demostración
// Puedes usarlo temporalmente para ver cómo funcionan las alertas

import { alertService } from '@/shared/services';

export const AlertDemo = () => {
  const handleSuccessAlert = () => {
    alertService.success('¡Operación completada exitosamente!');
  };

  const handleErrorAlert = () => {
    alertService.error('Ocurrió un error al procesar la solicitud');
  };

  const handleWarningAlert = () => {
    alertService.warning('¡Atención! Esta acción requiere confirmación');
  };

  const handleInfoAlert = () => {
    alertService.info('Esta es una información importante para ti');
  };

  const handlePromiseAlert = () => {
    const mockPromise = new Promise((resolve) => {
      setTimeout(() => resolve('Datos guardados'), 3000);
    });

    alertService.promise(
      mockPromise,
      {
        pending: 'Guardando datos...',
        success: '¡Datos guardados correctamente!',
        error: 'Error al guardar los datos',
      }
    );
  };

  const handleCustomAlert = () => {
    alertService.custom('Alerta personalizada con estilo único', {
      position: 'bottom-center',
      autoClose: 5000,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Demostración de Alertas
        </h2>
        <p className="text-gray-600 mb-8">
          Haz clic en los botones para ver los diferentes tipos de alertas
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={handleSuccessAlert}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            Alerta de Éxito
          </button>

          <button
            onClick={handleErrorAlert}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            Alerta de Error
          </button>

          <button
            onClick={handleWarningAlert}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            Alerta de Advertencia
          </button>

          <button
            onClick={handleInfoAlert}
            className="px-6 py-3 bg-[#8DD2FF] text-white rounded-lg hover:bg-[#7BC1EE] transition-colors shadow-md hover:shadow-lg font-medium"
          >
            Alerta de Info
          </button>

          <button
            onClick={handlePromiseAlert}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            Alerta de Promesa
          </button>

          <button
            onClick={handleCustomAlert}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            Alerta Personalizada
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Características:</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Gradientes suaves y profesionales</li>
            <li>Animaciones fluidas (300ms)</li>
            <li>Color de marca #8DD2FF para info</li>
            <li>Diseño responsivo</li>
            <li>Auto-cierre en 4 segundos</li>
            <li>Pausar al pasar el mouse</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
