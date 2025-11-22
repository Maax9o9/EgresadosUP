import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { useRef } from "react";
import type { FC } from "react";
import { ImageIcon } from "lucide-react";

export const ImageUploadButton: FC = () => {
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: imageUrl,
        altText: file.name,
      });
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        title="Insertar imagen"
      >
        <ImageIcon className="w-4 h-4" />
      </button>
    </>
  );
};
