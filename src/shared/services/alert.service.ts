// ============================================
// ALERT SERVICE - Global Toast Notifications
// ============================================

import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

/**
 * Configuración global para las alertas
 * Mantiene un look and feel consistente en toda la aplicación
 */
const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: {
    borderRadius: '0.5rem',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  },
};

/**
 * Servicio centralizado de alertas
 * Proporciona métodos para mostrar notificaciones con estilos consistentes
 */
export const alertService = {
  /**
   * Muestra una alerta de éxito
   * @param message - Mensaje a mostrar
   * @param options - Opciones adicionales de toast
   */
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-success',
    });
  },

  /**
   * Muestra una alerta de error
   * @param message - Mensaje a mostrar
   * @param options - Opciones adicionales de toast
   */
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-error',
    });
  },

  /**
   * Muestra una alerta de advertencia
   * @param message - Mensaje a mostrar
   * @param options - Opciones adicionales de toast
   */
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-warning',
    });
  },

  /**
   * Muestra una alerta informativa
   * @param message - Mensaje a mostrar
   * @param options - Opciones adicionales de toast
   */
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-info',
    });
  },

  /**
   * Muestra una alerta de carga (promise)
   * Útil para operaciones asíncronas
   * @param promise - Promise a monitorear
   * @param messages - Mensajes para cada estado (pending, success, error)
   */
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      pending: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) => {
    return toast.promise(
      promise,
      {
        pending: messages.pending,
        success: messages.success,
        error: messages.error,
      },
      {
        ...defaultOptions,
        ...options,
      }
    );
  },

  /**
   * Muestra una alerta personalizada
   * @param message - Mensaje a mostrar
   * @param options - Opciones completas de toast
   */
  custom: (message: string, options?: ToastOptions) => {
    toast(message, {
      ...defaultOptions,
      ...options,
    });
  },
};
