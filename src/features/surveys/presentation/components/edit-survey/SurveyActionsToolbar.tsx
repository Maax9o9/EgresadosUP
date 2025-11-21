// ============================================
// COMPONENT - Survey Actions Toolbar
// ============================================

import { 
  EyeIcon, 
  DocumentDuplicateIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

interface SurveyActionsToolbarProps {
  onPreview: () => void;
  onDuplicate?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const SurveyActionsToolbar = ({ 
  onPreview,
  onDuplicate,
  onMoveUp,
  onMoveDown 
}: SurveyActionsToolbarProps) => {
  const ActionButton = ({ 
    icon: Icon, 
    label, 
    onClick 
  }: { 
    icon: React.ComponentType<{ className?: string }>, 
    label: string, 
    onClick?: () => void 
  }) => (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="flex flex-col items-center gap-1 p-3 text-gray-600 hover:text-[#8DD2FF] hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
      title={label}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
      <div className="flex flex-col gap-1">
        <ActionButton icon={EyeIcon} label="Vista previa" onClick={onPreview} />
        <div className="border-t border-gray-100 my-1" />
        <ActionButton icon={DocumentDuplicateIcon} label="Duplicar" onClick={onDuplicate} />
        <ActionButton icon={ArrowUpIcon} label="Subir" onClick={onMoveUp} />
        <ActionButton icon={ArrowDownIcon} label="Bajar" onClick={onMoveDown} />
      </div>
    </div>
  );
};
