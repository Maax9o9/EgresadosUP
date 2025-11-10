// ============================================
// COMPONENT - Add Question Button
// ============================================

import { PlusIcon } from '@heroicons/react/24/outline';

interface AddQuestionButtonProps {
  onClick: () => void;
}

export const AddQuestionButton = ({ onClick }: AddQuestionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 hover:shadow-md hover:border-[#8DD2FF] transition-all group"
    >
      <div className="flex items-center justify-center gap-2 sm:gap-3 text-gray-600 group-hover:text-[#8DD2FF]">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
          <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <span className="text-sm sm:text-base font-medium">Agregar pregunta</span>
      </div>
    </button>
  );
};
