import type { MutableRefObject } from "react";

interface MetricPrintOptions {
  chartRefs: MutableRefObject<Array<any | null>>;
  sampleSize: number;
  headerId?: string;
  metricsId?: string;
}

export const registerMetricPrintHandler = ({
  chartRefs,
  sampleSize,
  headerId = "metric-header",
  metricsId = "metric-metrics",
}: MetricPrintOptions) => {
  const raf = () =>
    new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getInst = (index: number) => {
    const ref = chartRefs.current[index];
    if (!ref) return null;
    const inst = ref.getEchartsInstance?.();
    return inst || null;
  };

  const captureCharts = async (retriesPerChart = 4) => {
    const imgs: string[] = [];

    console.log("chartRefs.current:", chartRefs.current);
    console.log(
      "instancias:",
      Array.from({ length: sampleSize }, (_, i) => !!getInst(i)),
    );

    for (let i = 0; i < sampleSize; i++) {
      const inst = getInst(i);
      if (!inst || typeof inst.getDataURL !== "function") {
        console.log(`idx ${i}: instancia no válida`);
        imgs.push("");
        continue;
      }

      let dataUrl = "";
      for (let attempt = 0; attempt < retriesPerChart; attempt++) {
        inst.resize?.();
        await raf();
        await sleep(160); 
        dataUrl = inst.getDataURL({
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        });
        console.log(`idx ${i}, attempt ${attempt}, len:`, dataUrl?.length);
        if (dataUrl && dataUrl.length > 200) break;
      }
      imgs.push(dataUrl);
    }
    return imgs;
  };

  const captureAllWithRetries = async (attempts = 6, perChartRetries = 4) => {
    let lastImgs: string[] = [];
    for (let i = 0; i < attempts; i++) {
      await raf();
      await sleep(300); 
      lastImgs = await captureCharts(perChartRetries);
      const allHaveImage = lastImgs.every(
        (img) => !!img && img.length > 200,
      );
      if (allHaveImage) return lastImgs;
    }
    return lastImgs;
  };

  const handler = async () => {
    try {
      const headerEl = document.getElementById(headerId);
      const metricsEl = document.getElementById(metricsId);
      const headerHtml = headerEl ? headerEl.outerHTML : "";
      if (!metricsEl) {
        alert("No se encontró el contenido de métricas para imprimir.");
        return;
      }

      await raf();
      await sleep(300);

      let imgs = await captureAllWithRetries();

      if (imgs.every((img) => !img || img.length <= 200)) {
        alert(
          "No se pudieron generar las imágenes de las gráficas. Intenta de nuevo.",
        );
        return;
      }

      const head = document.head.innerHTML;
      const rawMetricsHtml = metricsEl.outerHTML;
      const metricsHtml = rawMetricsHtml.replace(
        'id="metric-metrics"',
        'id="metric-metrics-print"',
      );

      const w = window.open(
        "",
        "_blank",
        "width=1000,height=800,scrollbars=yes",
      );
      if (!w) {
        return;
      }
      w.document.open();
      const imgsJson = JSON.stringify(imgs);

      const script = `<script>
var imgs = ${imgsJson};
document.addEventListener('DOMContentLoaded', function () {
  console.log("imgs en print window", imgs.map(function(x){ return x && x.length; }));

  // Sustituir contenedores de gráfica por <img> usando los base64
  document.querySelectorAll('[data-chart-index]').forEach(function (el) {
    var idx = el.getAttribute('data-chart-index');
    var src = imgs[idx];
    if (src) {
      el.innerHTML = '<img src="' + src + '" style="max-width:300px;width:100%;height:auto;display:block;margin:0 auto;border:1px solid #e5e7eb;padding:6px;background:#fff"/>';
    } else {
      el.innerHTML = '<div style="height:240px;display:flex;align-items:center;justify-content:center;background:#f9fafb;color:#6b7280;border:1px dashed #e5e7eb">Gráfica no disponible</div>';
    }
  });

  // Trabajar solo con la copia para impresión
  var metricsEl = document.getElementById('metric-metrics-print');
  if (metricsEl) {
    var items = Array.prototype.slice.call(metricsEl.querySelectorAll('[data-metric-index]'));
    var wrapper = document.createElement('div');
    var firstCount = 2;

    if (items.length > 0) {
      var firstGroup = document.createElement('div');
      firstGroup.style.marginBottom = '12px';
      firstGroup.style.pageBreakAfter = 'always';

      // Primera página (clones)
      items.slice(0, firstCount).forEach(function (it) {
        var clone = it.cloneNode(true);
        clone.style.pageBreakInside = 'avoid';
        clone.style.minHeight = '420px';
        clone.style.padding = '12px';
        clone.style.boxSizing = 'border-box';
        firstGroup.appendChild(clone);
      });
      wrapper.appendChild(firstGroup);

      // Páginas siguientes (clones)
      for (var i = firstCount; i < items.length; i += 2) {
        var page = document.createElement('div');
        page.style.pageBreakAfter = 'always';
        page.style.marginBottom = '12px';

        if (items[i]) {
          var c1 = items[i].cloneNode(true);
          c1.style.pageBreakInside = 'avoid';
          c1.style.minHeight = '420px';
          c1.style.padding = '12px';
          c1.style.boxSizing = 'border-box';
          page.appendChild(c1);
        }
        if (items[i + 1]) {
          var c2 = items[i + 1].cloneNode(true);
          c2.style.pageBreakInside = 'avoid';
          c2.style.minHeight = '420px';
          c2.style.padding = '12px';
          c2.style.boxSizing = 'border-box';
          page.appendChild(c2);
        }
        wrapper.appendChild(page);
      }

      metricsEl.parentNode.replaceChild(wrapper, metricsEl);
    }
  }

  // pequeño delay extra antes de abrir el diálogo de impresión
  setTimeout(function() {
    window.print();
  }, 300);
});
</script>`;

      w.document.write(
        `<!doctype html><html><head>${head}<style>@media print{body{margin:0;padding:12px} .no-print{display:none} .print-hidden{display:none}} body{background:#fff;padding:12px;margin:0;font-family:Arial,Helvetica,sans-serif} h3{margin:0 0 8px 0}</style></head><body>${headerHtml}${metricsHtml}${script}</body></html>`,
      );
      w.document.close();
    } catch (err) {
      console.error(err);
      window.print();
    }
  };

  window.addEventListener("request-metrics-print", handler as EventListener);
  return () =>
    window.removeEventListener("request-metrics-print", handler as EventListener);
};
