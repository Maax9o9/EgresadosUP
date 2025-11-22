import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  DecoratorNode,
  type SerializedLexicalNode,
} from "lexical";
import type { LexicalCommand } from "lexical";
import { $wrapNodeInElement } from "@lexical/utils";
import { useEffect } from "react";
import type { ReactElement } from "react";

export type SerializedImageNode = SerializedLexicalNode & {
  src: string;
  altText: string;
  width: number | null;
  height: number | null;
};

export class ImageNode extends DecoratorNode<ReactElement> {
  __src: string;
  __altText: string;
  __width: number | null;
  __height: number | null;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode(
      serializedNode.src,
      serializedNode.altText,
      serializedNode.width,
      serializedNode.height
    );
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      type: "image",
      version: 1,
    };
  }

  constructor(
    src: string = "",
    altText: string = "",
    width: number | null = null,
    height: number | null = null,
    key?: string
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    div.style.display = "inline-block";
    div.style.margin = "10px 0";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactElement {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          borderRadius: "8px",
        }}
      />
    );
  }
}

export function $createImageNode({
  src,
  altText,
  width,
  height,
}: {
  src: string;
  altText: string;
  width?: number;
  height?: number;
}): ImageNode {
  return new ImageNode(src, altText, width, height);
}

export function $isImageNode(node: any): node is ImageNode {
  return node instanceof ImageNode;
}

export const INSERT_IMAGE_COMMAND: LexicalCommand<{
  src: string;
  altText: string;
}> = createCommand("INSERT_IMAGE_COMMAND");

export function ImagePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagePlugin: ImageNode not registered on editor");
    }

    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = $createImageNode(payload);
        $insertNodes([imageNode]);
        if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
          $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
