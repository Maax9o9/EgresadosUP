import type { FC } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { $generateHtmlFromNodes } from '@lexical/html';
import { ToolbarPlugin } from "./ToolbarPlugin";
import { ImageNode, ImagePlugin } from "./ImagePlugin";
import type { EditorState } from 'lexical';

interface EmailTemplateEditorProps {
  value: string;
  onChange: (val: string) => void;
  onHtmlChange?: (html: string) => void;
  readOnly?: boolean;
}

const EmailTemplateEditor: FC<EmailTemplateEditorProps> = ({ 
  value, 
  onChange, 
  onHtmlChange,
  readOnly = false 
}) => {
  const initialConfig = {
    namespace: "EmailTemplateEditor",
    editable: !readOnly,
    editorState: value && value.trim() ? value : undefined,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      LinkNode,
      ImageNode,
    ],
    theme: {
      root: "min-h-[400px] bg-white px-6 py-4 text-gray-800 text-base focus:outline-none",
      paragraph: "mb-3 text-base leading-relaxed",
      heading: {
        h1: "text-3xl font-bold mb-4 mt-3 leading-tight",
        h2: "text-2xl font-bold mb-3 mt-3 leading-tight",
        h3: "text-xl font-bold mb-2 mt-2 leading-tight",
      },
      quote: "border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3 py-1",
      list: {
        ul: "list-disc ml-6 mb-3 space-y-1",
        ol: "list-decimal ml-6 mb-3 space-y-1",
      },
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
      },
    },
    onError(error: Error) {
      console.error("Lexical error:", error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative flex flex-col bg-white rounded-lg overflow-hidden">
        <ToolbarPlugin readOnly={readOnly} />
        <div className="relative border-t border-gray-200">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[400px] max-h-[600px] overflow-y-auto outline-none px-6 py-4"
                spellCheck
              />
            }
            placeholder={
              <div className="absolute top-4 left-6 text-gray-400 pointer-events-none select-none">
                Escribe tu correo aquí...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ImagePlugin />
        <OnChangePlugin onChange={(editorState: EditorState, editor) => {
          editorState.read(() => {
            const json = JSON.stringify(editorState.toJSON());
            onChange(json);

            if (onHtmlChange) {
              const html = $generateHtmlFromNodes(editor, null);
              onHtmlChange(html);
            }
          });
        }} />
      </div>
    </LexicalComposer>
  );
};

export default EmailTemplateEditor;
