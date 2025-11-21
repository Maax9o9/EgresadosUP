// ============================================
// COMPONENT - Question Type Selector
// ============================================

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { TipoPregunta } from '@/shared/types';

interface QuestionTypeSelectorProps {
  value: TipoPregunta;
  onChange: (type: TipoPregunta) => void;
}

export const QuestionTypeSelector = ({ value, onChange }: QuestionTypeSelectorProps) => {
  const getTypeLabel = (type: TipoPregunta) => {
    const labels = {
      abierta: 'Respuesta corta',
      multiple: 'Opción múltiple',
      checkbox: 'Casillas de verificación',
      escala: 'Escala lineal (1-5)',
    };
    return labels[type];
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TipoPregunta)}
        className="appearance-none w-full rounded-lg bg-white border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-[#8DD2FF] focus:ring-2 focus:ring-[#8DD2FF]/20 cursor-pointer transition-all duration-300"
      >
        <option value="abierta">{getTypeLabel('abierta')}</option>
        <option value="multiple">{getTypeLabel('multiple')}</option>
        <option value="checkbox">{getTypeLabel('checkbox')}</option>
        <option value="escala">{getTypeLabel('escala')}</option>
      </select>
      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );
};
