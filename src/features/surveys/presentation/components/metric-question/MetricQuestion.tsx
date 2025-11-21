import { useState } from "react";
// using echarts for rendering charts in this component
import ReactECharts from "echarts-for-react";

const MetricQuestion = () => {

  const responses = ["A", "B", "A", "C", "A"];

  const counts = responses.reduce<Record<string, number>>((acc, r) => {
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});

  const dataCount = Object.entries(counts).map(([name, cnt]) => ({ name, value: cnt }));

  const [chartType, setChartType] = useState<"pie" | "donut" | "bar" | "radar">("pie");
  // selectValue controls what the select shows; initialize to the default chart so the button shows the active type
  const [selectValue, setSelectValue] = useState<string>("pie");

  // Six darker pastel tones (muted, slightly darker pastel palette)
  const COLORS = ["#5B8FF9", "#7FB7FF", "#9FD6FF", "#C3E9FF", "#9CCFD9", "#8FB7D9"];

  // Chart sizing and spacing
  const CHART_SIZE = 340; // px (a bit larger)
  const CHART_MARGIN_RIGHT = 150; // px (kept for backward compatibility; not used in responsive layout)

  // Prebuild bar option so we pass an object to ReactECharts (not a function)
  const barOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: {
      type: "category",
      data: dataCount.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#6B7280" },
    },
    // Hide Y axis numbers/lines as requested
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    grid: { left: 8, right: 8, bottom: 24, top: 8 },
    series: [
      {
        type: "bar",
        barWidth: 36,
        data: dataCount.map((d, i) => ({
          value: d.value,
          itemStyle: { color: COLORS[i % COLORS.length], borderRadius: [20, 20, 0, 0] },
        })),
        emphasis: { itemStyle: { opacity: 0.95 } },
      },
    ],
  };

  // Radar option: single series showing counts per category
  const maxVal = Math.max(...dataCount.map((d) => d.value), 1);
  const radarIndicators = dataCount.map((d) => ({ name: d.name, max: Math.ceil(maxVal * 1.2) }));
  const radarValues = dataCount.map((d) => d.value);
  const radarOption = {
    tooltip: {},
    radar: {
      indicator: radarIndicators,
      radius: '60%',
      name: { textStyle: { color: '#6B7280' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: radarValues,
            name: 'Responses',
            itemStyle: { color: COLORS[0] },
            areaStyle: { color: COLORS[0], opacity: 0.15 },
            lineStyle: { color: COLORS[0] },
          },
        ],
      },
    ],
  };

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      {/* Layout: on small screens stack (question row + chart below), on sm+ display side-by-side */}
      <div className="flex flex-col sm:flex-row justify-between items-start">

        {/* Left: question area (keeps its layout) */}
        <div className="w-full sm:w-1/2 pr-4">
          <h2 className="text-base font-semibold border-b-2 border-black w-fit mb-4">Pregunta sin título</h2>
          <div className="space-y-2">
            <label className="flex items-center text-gray-400">
              <input type="radio" name="option" disabled className="mr-2" />Opción 1
            </label>
            <label className="flex items-center text-gray-400">
              <input type="radio" name="option" disabled className="mr-2" />
            </label>
            <label className="flex items-center text-gray-400">
              <input type="radio" name="option" disabled className="mr-2" />
            </label>
          </div>
        </div>

        {/* Right: selector stays at top-right; chart will flow below on small screens */}
        <div className="w-full sm:w-1/2 flex flex-col items-end">
          <div className="w-full flex justify-end">
            <select
              value={selectValue}
              onChange={(e) => {
                const v = e.target.value as "pie" | "donut" | "bar" | "radar";
                setSelectValue(v);
                setChartType(v);
              }}
              // Responsive top margin: no top margin on mobile, 30px on sm+
              className="bg-black text-white text-sm px-3 py-1 rounded-md mb-2 cursor-pointer mt-0 sm:mt-[30px]"
              style={{ marginRight: 30 }}
            >
              <option value="" disabled>Tipo de gráfica</option>
              <option value="pie">Pastel</option>
              <option value="donut">Dona</option>
              <option value="bar">Barras</option>
              <option value="radar">Radar</option>
            </select>
          </div>

          {/* Chart: on small screens this will appear below the select */}
          <div className="w-full flex items-center justify-center mt-4 sm:mt-0">
            <div style={{ width: CHART_SIZE, height: CHART_SIZE }} className="flex items-center justify-center">
              {chartType === "bar" ? (
                <ReactECharts option={barOption} style={{ width: CHART_SIZE, height: CHART_SIZE }} />
              ) : chartType === "radar" ? (
                <ReactECharts option={radarOption} style={{ width: CHART_SIZE, height: CHART_SIZE }} />
              ) : (
                <ReactECharts
                  option={{
                    tooltip: { trigger: "item" },
                    legend: { top: "5%", left: "center" },
                    series: [
                      {
                        name: "Responses",
                        type: "pie",
                        radius: chartType === "donut" ? ["40%", "70%"] : ["0%", "70%"],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        itemStyle: { borderRadius: 10 },
                        label: { show: false, position: "center" },
                        emphasis: { label: { show: true, fontSize: 24, fontWeight: "bold" } },
                        labelLine: { show: false },
                        data: dataCount.map((d, i) => ({ value: d.value, name: d.name, itemStyle: { color: COLORS[i % COLORS.length] } })),
                      },
                    ],
                  }}
                  style={{ width: CHART_SIZE, height: CHART_SIZE }}
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MetricQuestion;
