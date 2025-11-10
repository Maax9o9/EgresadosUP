// ============================================
// PAGE - Home Dashboard
// ============================================

import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  BellIcon,
  ChartBarIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { ROUTES } from '@/shared/constants/route';

export default function HomePage() {
  const navigate = useNavigate();

  // ============================================
  // DATOS
  // ============================================
  
  const stats = {
    encuestasActivas: 5,
    formularios: 8,
    respuestasRecibidas: 142,
    tasaRespuesta: 78,
  };

  const quickActions = [
    {
      title: 'Nueva Encuesta',
      description: 'Crea una encuesta desde cero o usa un formulario',
      icon: PlusIcon,
      textColor: 'text-[#8DD2FF]',
      bgColor: 'bg-blue-50',
      onClick: () => navigate(ROUTES.SURVEYS_CREATE),
    },
    {
      title: 'Gestionar Encuestas',
      description: 'Ver y editar encuestas existentes',
      icon: ClipboardDocumentCheckIcon,
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      onClick: () => navigate(ROUTES.SURVEYS_CREATE),
    },
    {
      title: 'Enviar Aviso',
      description: 'Notifica a los egresados',
      icon: BellIcon,
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      onClick: () => {},
    },
    {
      title: 'Ver Reportes',
      description: 'Analiza resultados y datos',
      icon: ChartBarIcon,
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      onClick: () => {},
    },
  ];

  const statsCards = [
    {
      label: 'Encuestas activas',
      value: stats.encuestasActivas,
      icon: ClipboardDocumentCheckIcon,
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#8DD2FF]',
      badge: { text: 'Activo', color: 'text-green-600 bg-green-50' },
    },
    {
      label: 'Formularios',
      value: stats.formularios,
      icon: DocumentTextIcon,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Respuestas',
      value: stats.respuestasRecibidas,
      icon: ChartBarIcon,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Tasa de respuesta',
      value: `${stats.tasaRespuesta}%`,
      icon: SparklesIcon,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8DD2FF] to-[#6BB8E6] rounded-2xl flex items-center justify-center shadow-lg">
              <SparklesIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Bienvenido a EXAUP
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Sistema de Gestión de Egresados
              </p>
            </div>
          </div>
        </div>

        {/* Contadores */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                {stat.badge && (
                  <span className={`text-xs font-medium ${stat.badge.color} px-2 py-1 rounded-full`}>
                    {stat.badge.text}
                  </span>
                )}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Accesos Rápidos */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Accesos Rápidos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all text-left"
              >
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className={`h-6 w-6 ${action.textColor}`} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">
                    {action.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 text-sm font-medium ${action.textColor} group-hover:gap-3 transition-all`}>
                    Ir
                    <ArrowRightIcon className="h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

