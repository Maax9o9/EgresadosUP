import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon,
  BellAlertIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmDialog from "@/shared/components/ui/confirmAlert";
import { ROUTES } from '@/shared/constants/route';

// ----------------------------------
// 1) Tipos para la navegación
// ----------------------------------
interface ChildItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: ChildItem[];
}

// ----------------------------------
// 2) Definición de la navegación
// ----------------------------------
const navigation: NavItem[] = [
  {
    name: "Inicio",
    icon: HomeIcon,
    href: ROUTES.DASHBOARD,
  },
  {
    name: "Encuestas",
    icon: ClipboardDocumentCheckIcon,
    children: [
      { name: "Crear encuesta", href: ROUTES.SURVEYS_CREATE },
      { name: "Enviar encuesta", href: ROUTES.SURVEY_SENDTO },
      { name: "Catálogo", href: ROUTES.SURVEY_CATALOG },
      { name: "Encuestados", href: ROUTES.SURVEY_RESPONDENTS },
    ],
  },
  {
    name: "Avisos",
    icon: BellAlertIcon,
    children: [
      { name: "Crear plantilla", href: "/create-template" },
      { name: "Enviar aviso", href: "/send-notice" },
      { name: "Catálogo", href: "/notice-catalog" },
    ],
  },
  {
    name: "Registros",
    icon: ClipboardDocumentListIcon,
    children: [
      { name: "Status", href: "/registry-status" },
      { name: "Generar reporte", href: "/generate-report" },
      { name: "Métricas", href: ROUTES.SURVEY_METRICS },
    ],
  },
  {
    name: "Orgullo Up",
    icon: SparklesIcon,
    children: [
      { name: "Aprobación", href: "/approval" },
      { name: "Historial", href: "/history" },
    ],
  },
];

// ----------------------------------
// 3) Función para concatenar clases
// ----------------------------------
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

// ----------------------------------
// 4) Componente principal Layout
// ----------------------------------
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Determina si un item o sus hijos tienen la ruta activa
  function isItemActive(item: NavItem): boolean {
    if (item.href && location.pathname === item.href) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => child.href === location.pathname);
    }
    return false;
  }

  // Determina si algún hijo está activo (para resaltar el padre)
  function hasActiveChild(item: NavItem): boolean {
    if (!item.children) return false;
    return item.children.some((child) => child.href === location.pathname);
  }

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  // Componente de navegación reutilizable
  const NavigationContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-1">
        <li>
          <ul role="list" className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                {!item.children ? (
                  <Link
                    to={item.href ?? "#"}
                    onClick={() => isMobile && setSidebarOpen(false)}
                    className={classNames(
                      isItemActive(item)
                        ? "bg-black/10 text-black font-semibold"
                        : "text-black/80 hover:bg-black/5 hover:text-black font-medium",
                      "group flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          isItemActive(item)
                            ? "text-black"
                            : "text-black/70 group-hover:text-black",
                          "h-5 w-5 shrink-0 transition-colors"
                        )}
                      />
                    )}
                    <span className="truncate">{item.name}</span>
                  </Link>
                ) : (
                  <Disclosure defaultOpen={hasActiveChild(item)}>
                    {({ open }) => (
                      <div className="space-y-1">
                        <Disclosure.Button
                          className={classNames(
                            hasActiveChild(item)
                              ? "bg-black/10 text-black font-semibold"
                              : "text-black/80 hover:bg-black/5 hover:text-black font-medium",
                            "group flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200"
                          )}
                        >
                          {item.icon && (
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                hasActiveChild(item)
                                  ? "text-black"
                                  : "text-black/70 group-hover:text-black",
                                "h-5 w-5 shrink-0 transition-colors"
                              )}
                            />
                          )}
                          <span className="flex-1 truncate">
                            {item.name}
                          </span>
                          <ChevronDownIcon
                            className={classNames(
                              "h-4 w-4 transition-transform duration-200",
                              open ? "rotate-180" : "",
                              hasActiveChild(item)
                                ? "text-black"
                                : "text-black/70 group-hover:text-black"
                            )}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel as="ul" className="space-y-0.5 ml-8 mt-1">
                          {item.children?.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                to={subItem.href}
                                onClick={() => isMobile && setSidebarOpen(false)}
                                className={classNames(
                                  location.pathname === subItem.href
                                    ? "bg-black text-white font-medium shadow-sm"
                                    : "text-black/70 hover:bg-black/10 hover:text-black font-normal",
                                  "block rounded-lg px-3 py-2 text-sm transition-all duration-200"
                                )}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                )}
              </li>
            ))}
          </ul>
        </li>

        {/* Logout Button */}
        <li className="mt-auto pt-4 border-t border-black/10">
          <button
            onClick={handleLogoutClick}
            className="group flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-black/80 hover:bg-red-500/10 hover:text-red-600 transition-all duration-200"
          >
            <ArrowRightStartOnRectangleIcon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-black/70 group-hover:text-red-600 transition-colors"
            />
            <span>Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      {/* SIDEBAR MOBILE: Dialog */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <span className="sr-only">Cerrar menú</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>

            {/* Contenido del sidebar (mobile) */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#8DD2FF] px-4 pb-4">
              {/* Header */}
              <div className="flex h-16 shrink-0 items-center border-b border-black/10">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-black text-2xl font-extrabold font-sf-compact">
                    EXAUP
                  </h3>
                </div>
              </div>

              <NavigationContent isMobile={true} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* SIDEBAR DESKTOP*/}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#8DD2FF] rounded-tr-[20px] rounded-br-[20px] px-4 pb-4 shadow-[0px_4px_30px_rgba(0,0,0,0.2)]">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center border-b border-black/10">
            <div className="flex items-center gap-2.5">
              <h3 className="text-black text-2xl font-extrabold font-sf-compact">
                EXAUP
              </h3>
            </div>
          </div>

          <NavigationContent />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="lg:pl-64">
        {/* HEADER */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 items-center justify-between gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <span className="sr-only">Abrir menú</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>

          {/* Info del usuario en el header */}
          {user && (
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-black">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-[#8DD2FF] rounded-xl flex items-center justify-center shadow-md">
                <UserIcon className="w-5 h-5 text-black" />
              </div>
            </div>
          )}
        </div>

        {/* CONTENIDO */}
        <main className="py-8 bg-gray-50 min-h-screen">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="px-4 sm:px-6 lg:px-8"><Outlet /></div>
        </main>
      </div>

      {/* Diálogo de confirmación de logout */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="¿Cerrar sesión?"
        description={`¿Estás seguro de que deseas cerrar tu sesión, ${user?.name}? Tendrás que volver a iniciar sesión para acceder al panel.`}
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
      />
    </>
  );
}
