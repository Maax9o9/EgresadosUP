import { useState, useEffect, useRef } from "react";
// using echarts for rendering charts in this component
import ReactECharts from "echarts-for-react";

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
  // mobile render multiplier
  const MOBILE_SCALE = 0.68;

  // responsive detection for smaller screens
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const renderWidth = isMobile ? Math.round(CHART_RENDER_WIDTH * MOBILE_SCALE) : CHART_RENDER_WIDTH;
  const renderHeight = isMobile ? Math.round(CHART_RENDER_HEIGHT * MOBILE_SCALE) : CHART_RENDER_HEIGHT;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRefs = useRef<Array<any | null>>([]);

  // Listen for print requests dispatched from MetricHeader
  useEffect(() => {
    const handler = async () => {
      try {
        const headerEl = document.getElementById("metric-header");
        const metricsEl = document.getElementById("metric-metrics");
        const headerHtml = headerEl ? headerEl.outerHTML : "";
        if (!metricsEl) {
          alert("No se encontró el contenido de métricas para imprimir.");
          return;
        }

        // generate images for each chart
        const imgs: string[] = [];
        for (let i = 0; i < sampleQuestions.length; i++) {
          const comp = chartRefs.current[i];
          const inst = comp?.getEchartsInstance ? comp.getEchartsInstance() : null;
          if (inst && typeof inst.getDataURL === "function") {
            const dataUrl = inst.getDataURL({ pixelRatio: 2, backgroundColor: "#ffffff" });
            imgs.push(dataUrl);
          } else {
            imgs.push("");
          }
        }

        const head = document.head.innerHTML;
        const metricsHtml = metricsEl.outerHTML;
        const w = window.open("", "_blank", "width=1000,height=800,scrollbars=yes");
        if (!w) {
          alert("No se pudo abrir la ventana de impresión");
          return;
        }
        w.document.open();
        const imgsJson = JSON.stringify(imgs);
        const script = `<script>var imgs = ${imgsJson};document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-chart-index]').forEach(function(el){var idx = el.getAttribute('data-chart-index');var src = imgs[idx];if(src){el.innerHTML = '<img src="'+src+'" style="max-width:300px;width:100%;height:auto;display:block;margin:0 auto;border:1px solid #e5e7eb;padding:6px;background:#fff"/>';}else{el.innerHTML = '<div style="height:240px;display:flex;align-items:center;justify-content:center;background:#f9fafb;color:#6b7280;border:1px dashed #e5e7eb">Gráfica no disponible</div>';} });
        var metricsEl = document.getElementById('metric-metrics');
        if(metricsEl){
          var items = Array.prototype.slice.call(metricsEl.querySelectorAll('[data-metric-index]'));
          var wrapper = document.createElement('div');
          var firstCount = 2;
          if(items.length>0){
            var firstGroup = document.createElement('div');
            firstGroup.style.marginBottom = '12px';
            // ensure the first group breaks after the header+first items
            firstGroup.style.pageBreakAfter = 'always';
            items.slice(0, firstCount).forEach(function(it){ it.style.pageBreakInside = 'avoid'; it.style.minHeight = '420px'; it.style.padding = '12px'; it.style.boxSizing = 'border-box'; firstGroup.appendChild(it); });
            wrapper.appendChild(firstGroup);
            for(var i=firstCount;i<items.length;i+=2){
              var page = document.createElement('div');
              page.style.pageBreakAfter = 'always';
              page.style.marginBottom = '12px';
              if(items[i]){ items[i].style.pageBreakInside = 'avoid'; items[i].style.minHeight = '420px'; items[i].style.padding = '12px'; items[i].style.boxSizing = 'border-box'; page.appendChild(items[i]); }
              if(items[i+1]){ items[i+1].style.pageBreakInside = 'avoid'; items[i+1].style.minHeight = '420px'; items[i+1].style.padding = '12px'; items[i+1].style.boxSizing = 'border-box'; page.appendChild(items[i+1]); }
              wrapper.appendChild(page);
            }
            metricsEl.parentNode.replaceChild(wrapper, metricsEl);
          }
        }
        window.print();});</script>`;

        w.document.write(`<!doctype html><html><head>${head}<style>@media print{body{margin:0;padding:12px} .no-print{display:none}} body{background:#fff;padding:12px;margin:0;font-family:Arial,Helvetica,sans-serif} h3{margin:0 0 8px 0}</style></head><body>${headerHtml}${metricsHtml}${script}</body></html>`);
        w.document.close();
      } catch (err) {
        console.error(err);
        window.print();
      }
    };

    window.addEventListener("request-metrics-print", handler as EventListener);
    return () => window.removeEventListener("request-metrics-print", handler as EventListener);
  }, []);
  

  return (
    <div id="metric-metrics" ref={containerRef} className="border rounded-md p-4 bg-white shadow-sm">
      <div className="space-y-4">
        {sampleQuestions.map((q, qi) => {
          const counts = q.responses.reduce<Record<string, number>>((acc, r) => {
            acc[r] = (acc[r] || 0) + 1;
            return acc;
          }, {});
          const dataCountQ = Object.entries(counts).map(([name, cnt]) => ({ name, value: cnt }));

          const pieOptionQ = {
            tooltip: { trigger: "item" },
            legend: { top: "5%", left: "center" },
            series: [
              {
                name: "Responses",
                type: "pie",
                radius: (chartTypes[qi] ?? "pie") === "donut" ? ["40%", "70%"] : ["0%", "70%"],
                // move the pie center slightly down to create a top margin inside the chart
                center: ["50%", isMobile ? "60%" : "55%"],
                avoidLabelOverlap: false,
                // increase padAngle so slices have visible spacing between them
                padAngle: 8,
                itemStyle: { borderRadius: 10 },
                // give labels a bit more distance and use an outside position
                label: { show: true, position: "outside", formatter: "{b}: {c}", distance: 10 },
                emphasis: { label: { show: true, fontSize: 14, fontWeight: "bold" } },
                // longer label lines to avoid overlap with the pie itself
                labelLine: { show: true, length: 14, length2: 8 },
                data: dataCountQ.map((d, i) => ({ value: d.value, name: d.name, itemStyle: { color: COLORS[i % COLORS.length] } })),
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
                          itemStyle: { color: COLORS[i % COLORS.length], borderRadius: [20, 20, 0, 0] },
                        })),
                        label: { show: true, position: "top", formatter: "{c}", distance: 6 },
                        emphasis: { itemStyle: { opacity: 0.95 } },
                      },
                    ],
                  };

          const radarIndicators = dataCountQ.map((d) => ({ name: d.name, max: Math.ceil(maxVal * 1.2) }));
          const radarValues = dataCountQ.map((d) => d.value);
          const radarOptionQ = {
            tooltip: {},
            radar: { indicator: radarIndicators, radius: "60%", name: { textStyle: { color: "#6B7280" } } },
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
          const optionToUse = currentType === "bar" ? barOptionQ : currentType === "radar" ? radarOptionQ : pieOptionQ;

          return (
            <div data-metric-index={qi} key={`q-${qi}`} className="border rounded-md p-1 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div className="sm:w-4/12 pr-2">
                      <h3 className="text-sm font-semibold border-b-2 border-black w-fit mb-2">{q.title}</h3>
                      <div className="space-y-2">
                        {dataCountQ.map((opt, oi) => (
                          <label key={`opt-${qi}-${oi}`} className="flex items-center text-gray-700 text-sm">
                            <input type="radio" name={`option-${qi}`} disabled className="mr-2" />
                            <span className="flex justify-between w-full">
                              <span className="truncate text-sm">{opt.name}</span>
                              <span className="text-sm text-gray-500">{opt.value}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="w-full sm:w-8/12 flex flex-col items-end pr-4">
                    <div className="flex justify-end w-auto">
                    <select
                      value={chartTypes[qi]}
                      onChange={(e) => {
                        const v = e.target.value as ChartType;
                        setChartTypes((prev) => {
                          const copy = [...prev];
                          copy[qi] = v;
                          return copy;
                        });
                      }}
                      className="bg-black text-white text-sm px-3 py-1 rounded-md mb-1 cursor-pointer mt-0 sm:mt-[28px]"
                      style={{ marginRight: 20, marginTop: isMobile ? 15 : 0 }}
                    >
                      <option value="" disabled>Tipo de gráfica</option>
                      <option value="pie">Pastel</option>
                      <option value="donut">Dona</option>
                      <option value="bar">Barras</option>
                      <option value="radar">Radar</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-center sm:justify-end mt-1 sm:mt-0" style={{ overflow: 'visible' }}>
                                    <div data-chart-index={qi} style={{ width: CHART_WIDTH, height: CHART_HEIGHT, transform: 'translateX(0)' }} className="flex items-center justify-center">
                      <ReactECharts
                        ref={(r) => { chartRefs.current[qi] = r; }}
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
