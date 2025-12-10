import { useState, useEffect, useRef } from "react";
// using echarts for rendering charts in this component
import ReactECharts from "echarts-for-react";
import { registerMetricPrintHandler } from "./MetricScript";

const CustomChartTypeSelect = ({ 
  value, 
  onChange, 
  disabled = false 
}: { 
  value: string; 
  onChange: (e: { target: { value: string } }) => void;
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "", label: "Tipo de gráfica", disabled: true },
    { value: "pie", label: "Pastel", disabled: false },
    { value: "donut", label: "Dona", disabled: false },
    { value: "bar", label: "Barras", disabled: false },
    { value: "radar", label: "Radar", disabled: disabled },
  ];

  const currentLabel = options.find(opt => opt.value === value)?.label || "Tipo de gráfica";

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-auto print-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white text-sm px-3 py-1 rounded-md mb-1 cursor-pointer flex items-center gap-2"
        style={{
          marginRight: 20,
          marginTop: 15,
          borderRadius: '0.375rem',
        }}
      >
        {currentLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50 overflow-hidden">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                if (!option.disabled && option.value) {
                  onChange({ target: { value: option.value } });
                  setIsOpen(false);
                }
              }}
              disabled={option.disabled}
              className={`w-full text-left px-3 py-2 text-sm ${
                option.disabled
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-blue-100 cursor-pointer"
              } ${value === option.value ? "bg-blue-200 font-semibold" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MetricQuestion = () => {
  // Six example questions with sample responses (each response is an option key)
  const sampleQuestions = [
    { title: "¿Qué servicio utilizaste con mayor frecuencia?", responses: ["A", "B", "A", "C", "A"] },
    { title: "¿Cómo calificarías la atención recibida?", responses: ["Excelente", "Bueno", "Bueno", "Regular", "Excelente", "Bueno"] },
    { title: "¿Recomendarías el programa a otros?", responses: ["Sí", "Sí", "No", "Sí"] },
    { title: "¿Cuál es tu nivel de satisfacción con las instalaciones?", responses: ["Alto", "Medio", "Medio", "Bajo", "Medio"] },
    { title: "¿Participarías en futuras actividades?", responses: ["Sí", "No", "Sí", "Sí", "Sí"] },
    { title: "¿Qué tan claro fue el proceso de registro?", responses: ["Claro", "Claro", "Poco claro", "Claro"] },
  ];

  type ChartType = "pie" | "donut" | "bar" | "radar";
  const [chartTypes, setChartTypes] = useState<ChartType[]>(sampleQuestions.map(() => "pie"));

  // Six darker pastel tones (muted, slightly darker pastel palette)
  const COLORS = ["#5B8FF9", "#7FB7FF", "#9FD6FF", "#C3E9FF", "#9CCFD9", "#8FB7D9"];

  // Chart sizing and spacing — slightly smaller canvas and more compact flex items
  const CHART_WIDTH = 460; // px (container width reduced)
  const CHART_HEIGHT = 360; // px (container height reduced)
  // Render size slightly reduced so charts are a bit smaller
  const CHART_RENDER_WIDTH = 420; // px (render width)
  const CHART_RENDER_HEIGHT = 300; // px (render height)
  // mobile render multiplier - escalas independientes para ancho y alto
  const MOBILE_WIDTH_SCALE = 1;
  const MOBILE_HEIGHT_SCALE = 1; // Mayor altura para evitar cortes

  // responsive detection for smaller screens
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const renderWidth = isMobile ? Math.round(CHART_RENDER_WIDTH * MOBILE_WIDTH_SCALE) : CHART_RENDER_WIDTH;
  const renderHeight = isMobile ? Math.round(CHART_RENDER_HEIGHT * MOBILE_HEIGHT_SCALE) : CHART_RENDER_HEIGHT;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRefs = useRef<Array<any | null>>([]);

  // Listen for print requests dispatched from MetricHeader
  useEffect(() => {
    const detach = registerMetricPrintHandler({
      chartRefs,
      sampleSize: sampleQuestions.length,
    });
    return detach;
  }, [sampleQuestions.length]);

  return (
    <div
      id="metric-metrics"
      ref={containerRef}
      className="border rounded-md p-4 bg-white shadow-sm"
    >
      {/* CustomChartTypeSelect component is used below */}
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

          const pieOptionQ = {
            tooltip: { trigger: "item" },
            legend: { top: "5%", left: "center" },
            series: [
              {
                name: "Responses",
                type: "pie",
                radius:
                  (chartTypes[qi] ?? "pie") === "donut"
                    ? ["40%", "70%"]
                    : ["0%", "70%"],
                // move the pie center slightly down to create a top margin inside the chart
                center: ["50%", isMobile ? "60%" : "55%"],
                avoidLabelOverlap: false,
                // increase padAngle so slices have visible spacing between them
                padAngle: 8,
                itemStyle: { borderRadius: 10 },
                // give labels a bit more distance and use an outside position
                label: {
                  show: true,
                  position: "outside",
                  formatter: "{b}: {c}",
                  distance: 10,
                },
                emphasis: {
                  label: { show: true, fontSize: 14, fontWeight: "bold" },
                },
                // longer label lines to avoid overlap with the pie itself
                labelLine: { show: true, length: 14, length2: 8 },
                data: dataCountQ.map((d, i) => ({
                  value: d.value,
                  name: d.name,
                  itemStyle: { color: COLORS[i % COLORS.length] },
                })),
              },
            ],
          };

          // Calculate max for y-axis so the top label won't be cut off
          const maxVal = Math.max(...dataCountQ.map((d) => d.value), 1);

          const barOptionQ = {
            tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
            xAxis: {
              type: "category",
              data: dataCountQ.map((d) => d.name),
              axisLine: { show: false },
              axisTick: { show: false },
              axisLabel: { color: "#6B7280" },
            },
            yAxis: {
              type: "value",
              max: Math.ceil(maxVal * 1.2),
              axisLine: { show: false },
              axisTick: { show: false },
              axisLabel: { show: false },
              splitLine: { show: false },
            },
            // give more top space so labels above bars are visible
            grid: { left: 8, right: 8, bottom: 24, top: 48 },
            series: [
              {
                type: "bar",
                barWidth: 36,
                data: dataCountQ.map((d, i) => ({
                  value: d.value,
                  itemStyle: {
                    color: COLORS[i % COLORS.length],
                    borderRadius: [20, 20, 0, 0],
                  },
                })),
                label: {
                  show: true,
                  position: "top",
                  formatter: "{c}",
                  distance: 6,
                },
                emphasis: { itemStyle: { opacity: 0.95 } },
              },
            ],
          };

          const radarIndicators = dataCountQ.map((d) => ({
            name: d.name,
            max: Math.ceil(maxVal * 1.2),
          }));
          const radarValues = dataCountQ.map((d) => d.value);
          const radarOptionQ = {
            tooltip: {},
            radar: {
              indicator: radarIndicators,
              radius: "60%",
              name: { textStyle: { color: "#6B7280" } },
            },
            series: [
              {
                type: "radar",
                data: [
                  {
                    value: radarValues,
                    name: "Responses",
                    itemStyle: { color: COLORS[0] },
                    areaStyle: { color: COLORS[0], opacity: 0.15 },
                    lineStyle: { color: COLORS[0] },
                    label: { show: true, formatter: "{c}" },
                  },
                ],
              },
            ],
          };

          const currentType = chartTypes[qi] ?? "pie";
          const optionToUse =
            currentType === "bar"
              ? barOptionQ
              : currentType === "radar"
              ? radarOptionQ
              : pieOptionQ;

          return (
            <div
              data-metric-index={qi}
              key={`q-${qi}`}
              className="border rounded-md p-1 bg-white shadow-sm"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="w-full sm:w-3/12 pr-0 sm:pr-2 mb-4 sm:mb-0 sm:mt-[15px] sm:ml-[30px]">
                  <h3 className="text-sm font-semibold border-b-2 border-black w-fit mb-2">
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

                <div className="w-full sm:w-9/12 flex flex-col items-end -mr-6 sm:mr-0 sm:pr-4">
                  <CustomChartTypeSelect
                    value={chartTypes[qi]}
                    onChange={(e) => {
                      const v = e.target.value as ChartType;
                      setChartTypes((prev) => {
                        const copy = [...prev];
                        copy[qi] = v;
                        return copy;
                      });
                    }}
                    disabled={dataCountQ.length <= 2}
                  />

                  <div
                    className="flex items-center justify-center sm:justify-end mt-1 sm:mt-0 -mr-15 sm:mr-0"
                    style={{ overflow: "visible" }}
                  >
                    <div
                      data-chart-index={qi}
                      style={{
                        width: CHART_WIDTH,
                        height: CHART_HEIGHT,
                        transform: "translateX(0)",
                      }}
                      className="flex items-center justify-center"
                    >
                      <ReactECharts
                        ref={(r) => {
                          chartRefs.current[qi] = r;
                        }}
                        key={`q-${qi}-chart-${currentType}`}
                        option={optionToUse}
                        style={{ width: renderWidth, height: renderHeight }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricQuestion;
