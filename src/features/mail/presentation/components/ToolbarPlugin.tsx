import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createParagraphNode } from "lexical";
import type { FC } from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Quote, 
  Undo, 
  Redo,
  Type
} from "lucide-react";
import { ImageUploadButton } from "./ImageUploadButton";
import { FooterInsertButton } from "./FooterInsertButton";

interface ToolbarPluginProps {
  readOnly?: boolean;
}

export const ToolbarPlugin: FC<ToolbarPluginProps> = ({ readOnly }) => {
  const [editor] = useLexicalComposerContext();

  if (readOnly) return null;

  const applyFormat = (format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatHeading = (headingSize: 'h1' | 'h2') => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 px-3 py-2 rounded-t-lg">
      <button
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        title="Deshacer"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        title="Rehacer"
      >
        <Redo className="w-4 h-4" />
      </button>

      <div className="w-px bg-gray-300 mx-1" />

      <button
        onClick={formatParagraph}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        title="Párrafo normal"
      >
        <Type className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatHeading('h1')}
        className="px-2 py-1 rounded hover:bg-gray-200 font-bold transition-colors"
        title="Encabezado 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatHeading('h2')}
        className="px-2 py-1 rounded hover:bg-gray-200 font-bold transition-colors"
        title="Encabezado 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <div className="w-px bg-gray-300 mx-1" />

      <button
        onClick={() => applyFormat("bold")}
        className="p-2 rounded hover:bg-gray-200 font-bold transition-colors"
        title="Negrita"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => applyFormat("italic")}
        className="p-2 rounded hover:bg-gray-200 italic transition-colors"
        title="Cursiva"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => applyFormat("underline")}
        className="p-2 rounded hover:bg-gray-200 underline transition-colors"
        title="Subrayado"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button
        onClick={() => applyFormat("strikethrough")}
        className="p-2 rounded hover:bg-gray-200 line-through transition-colors"
        title="Tachado"
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px bg-gray-300 mx-1" />

      <button
        onClick={formatQuote}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        title="Cita"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px bg-gray-300 mx-1" />

      <ImageUploadButton />

      <div className="w-px bg-gray-300 mx-1" />

      <FooterInsertButton />
    </div>
  );
};
