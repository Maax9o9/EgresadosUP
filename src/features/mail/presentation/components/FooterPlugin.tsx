import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $getRoot } from "lexical";
import type { FC } from "react";
import { Mail } from "lucide-react";

interface FooterPluginProps {
  onInsert?: () => void;
}

export const FooterPlugin: FC<FooterPluginProps> = ({ onInsert }) => {
  const [editor] = useLexicalComposerContext();

  const insertFooter = () => {
    editor.update(() => {
      const root = $getRoot();
      
      const footerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; margin-top: 40px; border-radius: 12px; color: white; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: white; width: 120px; height: 120px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
                <img src="https://via.placeholder.com/80" alt="Logo Universidad Politécnica" style="width: 80px; height: 80px; border-radius: 50%;" />
              </div>
              <h2 style="margin: 20px 0 10px 0; font-size: 24px; font-weight: bold;">Universidad Politécnica</h2>
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">Excelencia en educación superior</p>
            </div>
            
            <div style="border-top: 2px solid rgba(255,255,255,0.2); padding-top: 30px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; vertical-align: top;">
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; flex-shrink: 0;">
                        <span style="font-size: 20px;">📧</span>
                      </div>
                      <div>
                        <p style="margin: 0 0 5px 0; font-weight: bold; font-size: 14px;">Correo electrónico</p>
                        <p style="margin: 0; font-size: 13px; opacity: 0.9;">contacto@universidadpolitecnica.edu.mx</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; vertical-align: top;">
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; flex-shrink: 0;">
                        <span style="font-size: 20px;">📍</span>
                      </div>
                      <div>
                        <p style="margin: 0 0 5px 0; font-weight: bold; font-size: 14px;">Dirección</p>
                        <p style="margin: 0; font-size: 13px; opacity: 0.9;">Av. Universidad #123, Col. Centro<br/>Ciudad, Estado, C.P. 12345</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; vertical-align: top;">
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; flex-shrink: 0;">
                        <span style="font-size: 20px;">📞</span>
                      </div>
                      <div>
                        <p style="margin: 0 0 5px 0; font-weight: bold; font-size: 14px;">Teléfono</p>
                        <p style="margin: 0; font-size: 13px; opacity: 0.9;">+52 (123) 456-7890</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; vertical-align: top;">
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; flex-shrink: 0;">
                        <span style="font-size: 20px;">🌐</span>
                      </div>
                      <div>
                        <p style="margin: 0 0 5px 0; font-weight: bold; font-size: 14px;">Sitio web</p>
                        <p style="margin: 0; font-size: 13px; opacity: 0.9;">www.universidadpolitecnica.edu.mx</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.2);">
              <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                © ${new Date().getFullYear()} Universidad Politécnica. Todos los derechos reservados.
              </p>
              <div style="margin-top: 15px;">
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px; font-size: 12px; opacity: 0.9;">Política de Privacidad</a>
                <span style="opacity: 0.5;">|</span>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px; font-size: 12px; opacity: 0.9;">Términos y Condiciones</a>
                <span style="opacity: 0.5;">|</span>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px; font-size: 12px; opacity: 0.9;">Cancelar suscripción</a>
              </div>
            </div>
          </div>
        </div>
      `;

      const paragraph = $createParagraphNode();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = footerHTML;
      
      root.append(paragraph);
      paragraph.select();
    });

    onInsert?.();
  };

  return (
    <button
      onClick={insertFooter}
      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#8DD2FF] hover:bg-[#8DD2FF]/5 transition-all duration-200 font-medium"
      title="Insertar footer prediseñado"
    >
      <Mail className="w-4 h-4" />
      <span>Insertar footer</span>
    </button>
  );
};
