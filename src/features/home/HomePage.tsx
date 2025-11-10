export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Bienvenido a EXAUP
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Panel de Control</h2>
        <p className="text-gray-600">
          Este es el contenido principal de tu aplicación. 
          Puedes navegar usando el menú lateral.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Encuestas</h3>
            <p className="text-sm text-gray-600">Crea y gestiona encuestas</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Avisos</h3>
            <p className="text-sm text-gray-600">Envía notificaciones</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Registros</h3>
            <p className="text-sm text-gray-600">Revisa el historial</p>
          </div>
        </div>
      </div>
    </div>
  );
}
