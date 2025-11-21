import type { FC, ReactNode } from "react";
import { Menu, Portal } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";

export type DropDownItem = {
  key?: string;
  label: ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
};

type Props = {
  items: DropDownItem[];
  button?: ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
};

const DropDown: FC<Props> = ({
  items,
  button,
  buttonClassName = "inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100",
  menuClassName = "absolute right-0 z-50 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none",
}) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const updateCoords = () => {
    const el = buttonRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({ top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div ref={buttonRef} onClick={updateCoords}>
        <Menu.Button className={buttonClassName}>
          {button ?? <EllipsisHorizontalIcon className="w-5 h-5" aria-hidden="true" />}
        </Menu.Button>
      </div>

      <Portal>
        {coords ? (
          <Menu.Items
            className={((): string => {
              // remove absolute/left/right positioning from provided class to avoid conflicts
              const cleaned = menuClassName.replace(/\babsolute\b|\bright-0\b|\bleft-0\b/g, "").trim();
              return `${cleaned} absolute`;
            })()}
            style={{ position: "absolute", top: coords.top + coords.height, left: coords.left }}
          >
            <div className="py-1">
              {items.map((it, idx) => (
                <Menu.Item key={it.key ?? `${idx}`}> 
                  {({ active }) => {
                    const base = active
                      ? "bg-gray-100 text-gray-900 block w-full text-left px-4 py-2 text-sm"
                      : "text-gray-700 block w-full text-left px-4 py-2 text-sm";

                    if (it.href) {
                      return (
                        <a href={it.href} className={base} onClick={it.onClick}>
                          {it.label}
                        </a>
                      );
                    }

                    return (
                      <button type="button" className={base} onClick={it.onClick} disabled={it.disabled}>
                        {it.label}
                      </button>
                    );
                  }}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        ) : null}
      </Portal>
    </Menu>
  );
};

export default DropDown;
