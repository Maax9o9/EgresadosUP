
const MetricHeader = () => {
  const printAllMetrics = () => {
    // ask MetricQuestion to generate images and perform printing
    window.dispatchEvent(new Event("request-metrics-print"));
  };

  return (
    <div id="metric-header" className="border rounded-md p-4 bg-white shadow-sm metric-header">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-black">Encuesta 2025</h1>
          <p className="text-gray-400 font-semibold mt-2">Descripción</p>
        </div>
        <div>
          <button onClick={printAllMetrics} className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700">Imprimir métricas</button>
        </div>
      </div>
    </div>
  );
};

export default MetricHeader;
