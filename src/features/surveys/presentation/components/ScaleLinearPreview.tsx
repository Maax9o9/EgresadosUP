// ============================================
// COMPONENT - Scale Linear Preview
// ============================================

export const ScaleLinearPreview = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 my-4 sm:my-6">
      <span className="text-sm font-medium text-gray-600 min-w-[20px]">1</span>
      <div className="flex gap-2 sm:gap-4 flex-1 justify-start sm:justify-center overflow-x-auto pb-2 sm:pb-0 w-full">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center cursor-pointer hover:border-[#8DD2FF] hover:bg-blue-50 transition-all"
          >
            <span className="text-sm font-medium text-gray-600">{num}</span>
          </div>
        ))}
      </div>
      <span className="text-sm font-medium text-gray-600 min-w-[20px] hidden sm:inline">5</span>
    </div>
  );
};
