import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { Mail } from "lucide-react";
import type { FC } from "react";

export const FooterInsertButton: FC = () => {
  const [editor] = useLexicalComposerContext();

  const insertFooter = () => {
    editor.update(() => {
      const root = $getRoot();
      
      // Create footer HTML content
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
                        <p style="margin: 0; font-size: 13px; opacity: 0.9;">Av. Universidad #123, Colonia Educativa<br/>Ciudad, Estado, CP 12345</p>
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
            
            <div style="border-top: 2px solid rgba(255,255,255,0.2); margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 12px; opacity: 0.8;">© 2025 Universidad Politécnica. Todos los derechos reservados.</p>
              <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="#" style="color: white; text-decoration: none; font-size: 12px; opacity: 0.9; hover: opacity: 1;">Políticas de Privacidad</a>
                <span style="opacity: 0.5;">•</span>
                <a href="#" style="color: white; text-decoration: none; font-size: 12px; opacity: 0.9; hover: opacity: 1;">Términos y Condiciones</a>
                <span style="opacity: 0.5;">•</span>
                <a href="#" style="color: white; text-decoration: none; font-size: 12px; opacity: 0.9; hover: opacity: 1;">Contacto</a>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Parse HTML and convert to Lexical nodes
      const parser = new DOMParser();
      const doc = parser.parseFromString(footerHTML, 'text/html');
      const nodes = $generateNodesFromDOM(editor, doc);
      
      // Insert nodes at the end of the document
      root.append(...nodes);
    });
  };

  return (
    <button
      onClick={insertFooter}
      className="p-2 rounded hover:bg-gray-200 transition-colors"
      title="Insertar pie de página"
    >
      <Mail className="w-4 h-4" />
    </button>
  );
};
