import { useRef } from "react";

const Question = () => {
  // Six example questions with sample responses
  const sampleQuestions = [
    { title: "¿Qué servicio utilizaste con mayor frecuencia?", responses: ["A", "B", "A", "C", "A"] },
    { title: "¿Cómo calificarías la atención recibida?", responses: ["Excelente", "Bueno", "Bueno", "Regular", "Excelente", "Bueno"] },
    { title: "¿Recomendarías el programa a otros?", responses: ["Sí", "Sí", "No", "Sí"] },
    { title: "¿Cuál es tu nivel de satisfacción con las instalaciones?", responses: ["Alto", "Medio", "Medio", "Bajo", "Medio"] },
    { title: "¿Participarías en futuras actividades?", responses: ["Sí", "No", "Sí", "Sí", "Sí"] },
    { title: "¿Qué tan claro fue el proceso de registro?", responses: ["Claro", "Claro", "Poco claro", "Claro"] },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      id="question-preview"
      ref={containerRef}
      className="border rounded-md p-4 bg-white shadow-sm"
    >
      <div className="space-y-4">
        {sampleQuestions.map((q, qi) => {
          const counts = q.responses.reduce<Record<string, number>>((acc, r) => {
            acc[r] = (acc[r] || 0) + 1;
            return acc;
          }, {});
          const dataCountQ = Object.entries(counts).map(([name, cnt]) => ({
            name,
            value: cnt,
          }));

          return (
            <div
              key={`q-${qi}`}
              className="border rounded-md p-4 bg-white shadow-sm"
            >
              <div className="w-full">
                <h3 className="text-sm font-semibold border-b-2 border-black w-fit mb-4">
                  {q.title}
                </h3>
                <div className="space-y-2">
                  {dataCountQ.map((opt, oi) => (
                    <label
                      key={`opt-${qi}-${oi}`}
                      className="flex items-center text-gray-700 text-sm"
                    >
                      <input
                        type="radio"
                        name={`option-${qi}`}
                        disabled
                        className="mr-2"
                      />
                      <span className="flex justify-between w-full">
                        <span className="truncate text-sm">{opt.name}</span>
                        <span className="text-sm text-gray-500">
                          {opt.value}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
