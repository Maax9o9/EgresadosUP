import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeftIcon, 
  SaveIcon, 
  EyeIcon, 
  EyeOffIcon,
  FileTextIcon,
  MailIcon,
  TagIcon,
  AlignLeftIcon
} from "lucide-react";
import EmailTemplateEditor from "../components/EmailTemplateEditor";
import { ROUTES } from "@/shared/constants/route";
import { alertService } from "@/shared/services/alert.service";

export const CreateEmailTemplatePage = () => {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = () => {
    if (!templateName.trim()) {
      alertService.error("El nombre de la plantilla es requerido");
      return;
    }
    if (!subject.trim()) {
      alertService.error("El asunto del correo es requerido");
      return;
    }
    if (!editorContent) {
      alertService.error("El contenido del correo es requerido");
      return;
    }

    const template = {
      id: Date.now().toString(),
      name: templateName,
      subject,
      description,
      category,
      content: editorContent,
      htmlContent: htmlContent,
      createdAt: new Date().toISOString(),
    };

    console.log("Template guardado:", template);
    alertService.success("Plantilla guardada correctamente");
  };

  const handleCancel = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const categories = [
    { value: "bienvenida", label: "Bienvenida" },
    { value: "informativo", label: "Informativo" },
    { value: "encuesta", label: "Encuesta" },
    { value: "evento", label: "Evento" },
    { value: "recordatorio", label: "Recordatorio" },
    { value: "otros", label: "Otros" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al inicio</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Nueva plantilla de correo
              </h1>
              <p className="text-gray-600 mt-2">
                Crea y personaliza plantillas para tus comunicaciones por correo electrónico
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isPreview
                    ? "bg-[#8DD2FF] text-white shadow-md hover:bg-[#6BB8E6]"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-[#8DD2FF] hover:text-[#8DD2FF]"
                }`}
              >
                {isPreview ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                <span>{isPreview ? "Modo edición" : "Vista previa"}</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!templateName || !subject || !editorContent}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8DD2FF] to-[#6BB8E6] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-[#6BB8E6] hover:to-[#8DD2FF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              >
                <SaveIcon className="w-4 h-4" />
                <span>Guardar plantilla</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-[#6BB8E6]" />
                Información básica
              </h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span>Nombre de la plantilla</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Ej: Bienvenida a egresados"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#8DD2FF] focus:ring-2 focus:ring-[#8DD2FF]/20 outline-none transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <TagIcon className="w-4 h-4" />
                    <span>Categoría</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#8DD2FF] focus:ring-2 focus:ring-[#8DD2FF]/20 outline-none transition-all bg-white text-gray-900"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MailIcon className="w-4 h-4" />
                  <span>Asunto del correo</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Escribe el asunto del correo"
                  maxLength={120}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#8DD2FF] focus:ring-2 focus:ring-[#8DD2FF]/20 outline-none transition-all text-gray-900 placeholder-gray-400"
                />
                <p className="text-xs text-gray-500">
                  {subject.length}/120 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <AlignLeftIcon className="w-4 h-4" />
                  <span>Descripción interna</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción breve de la plantilla para uso interno (opcional)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#8DD2FF] focus:ring-2 focus:ring-[#8DD2FF]/20 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MailIcon className="w-5 h-5 text-[#6BB8E6]" />
                Contenido del correo
                <span className="text-red-500 text-base">*</span>
              </h2>
              {!isPreview && (
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                  Modo edición
                </span>
              )}
            </div>

            <div className="relative">
              {isPreview ? (
                <div className="min-h-[500px] bg-gradient-to-br from-gray-50 to-white p-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#8DD2FF] to-[#6BB8E6] px-6 py-4">
                        <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">
                          Asunto del correo
                        </p>
                        <h2 className="text-xl font-bold text-white">
                          {subject || "Sin asunto definido"}
                        </h2>
                      </div>
                      <div className="p-8">
                        {htmlContent ? (
                          <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                          />
                        ) : (
                          <p className="text-gray-400 text-center py-12">
                            Sin contenido para previsualizar
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <EmailTemplateEditor
                  value={editorContent}
                  onChange={setEditorContent}
                  onHtmlChange={setHtmlContent}
                  readOnly={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
