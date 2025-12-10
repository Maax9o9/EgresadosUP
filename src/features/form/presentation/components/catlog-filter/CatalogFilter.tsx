import { useState, type FunctionComponent } from "react";
import { Calendar, Search, X, ArrowUpDown, Filter } from "lucide-react";

interface CatalogFilterProps {
  selectedCount?: number;
  totalSurveys?: number;
  onSearchChange?: (search: string) => void;
  onCategoryChange?: (category: string) => void;
  onDateChange?: (date: string | null) => void;
  onSortChange?: (sort: string) => void;
}

const CatalogFilter: FunctionComponent<CatalogFilterProps> = ({ 
  selectedCount = 0,
  totalSurveys = 0,
  onSearchChange,
  onCategoryChange,
  onDateChange,
  onSortChange
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearchChange?.("");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryChange?.(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange?.(value);
  };

  const handleApplyDate = () => {
    if (selectedDate) {
      onDateChange?.(selectedDate);
      setShowDatePicker(false);
    }
  };

  const handleClearDate = () => {
    setSelectedDate("");
    onDateChange?.(null);
    setShowDatePicker(false);
  };

  const clearAllFilters = () => {
    handleClearSearch();
    setSelectedCategory("");
    onCategoryChange?.("");
    handleClearDate();
    setSortBy("newest");
    onSortChange?.("newest");
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedDate || sortBy !== "newest";

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm relavite">
      {/* Header con estadísticas */}
      <div className="bg-gradient-to-r from-[#8DD2FF] to-[#6BB8E6] px-6 py-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white" />
              <h3 className="text-white font-semibold text-lg">Filtros y búsqueda</h3>
            </div>
            {selectedCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg backdrop-blur-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">
                  {selectedCount} seleccionada
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm">Total:</span>
            <span className="text-white font-bold text-xl">{totalSurveys}</span>
            <span className="text-white/80 text-sm">encuestas</span>
          </div>
        </div>
      </div>

      {/* Contenido de filtros */}
      <div className="p-6 space-y-4">
        {/* Fila 1: Búsqueda principal */}
        <div className="relative">
          <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 h-12 bg-white focus-within:border-[#8DD2FF] focus-within:ring-2 focus-within:ring-[#8DD2FF]/20 transition-all">
            <Search className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar encuestas por título o descripción..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 font-medium text-sm"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2 p-1 hover:bg-red-50 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Fila 2: Filtros avanzados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Selector de categorías */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Categoría
            </label>
            <select 
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 rounded-lg px-3 h-10 font-medium cursor-pointer hover:border-[#8DD2FF] focus:border-[#8DD2FF] focus:ring-2 focus:ring-[#8DD2FF]/20 transition-all outline-none text-sm"
            >
              <option value="">Todas las categorías</option>
              <option value="satisfaccion">📊 Satisfacción</option>
              <option value="clima">🌤️ Clima laboral</option>
              <option value="evaluacion">⭐ Evaluación</option>
              <option value="capacitacion">📚 Capacitación</option>
            </select>
          </div>

          {/* Selector de ordenamiento */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Ordenar por
            </label>
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 rounded-lg pl-10 pr-3 h-10 font-medium cursor-pointer hover:border-[#8DD2FF] focus:border-[#8DD2FF] focus:ring-2 focus:ring-[#8DD2FF]/20 transition-all outline-none appearance-none text-sm"
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguas</option>
                <option value="title-asc">Título (A-Z)</option>
                <option value="title-desc">Título (Z-A)</option>
                <option value="questions-asc">Menos preguntas</option>
                <option value="questions-desc">Más preguntas</option>
              </select>
            </div>
          </div>

          {/* Selector de fecha - VERSIÓN CORREGIDA */}
<div className="relative">
  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
    Fecha creación
  </label>
  <button 
    onClick={() => setShowDatePicker(!showDatePicker)}
    className={`w-full flex items-center justify-between border-2 rounded-lg px-3 h-10 font-medium transition-all ${
      selectedDate
        ? 'bg-[#8DD2FF]/10 border-[#8DD2FF] text-[#6BB8E6]' 
        : 'bg-white border-gray-300 text-gray-700 hover:border-[#8DD2FF]'
    }`}
  >
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4" />
      <span className="text-sm">
        {selectedDate ? new Date(selectedDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Seleccionar fecha'}
      </span>
    </div>
    {selectedDate && (
      <X 
        className="w-4 h-4 hover:text-red-500" 
        onClick={(e) => {
          e.stopPropagation();
          handleClearDate();
        }} 
      />
    )}
  </button>

  {showDatePicker && (
    <>
      {/* Overlay de fondo */}
      <div 
        className="fixed inset-0 z-[9998]" 
        onClick={() => setShowDatePicker(false)}
      />
      
      {/* Modal del datepicker */}
      <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-4 z-[9999] w-full sm:w-72">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Seleccionar fecha
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8DD2FF] focus:border-[#8DD2FF] outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDatePicker(false)}
              className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleApplyDate}
              disabled={!selectedDate}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8DD2FF] to-[#6BB8E6] rounded-lg hover:from-[#6BB8E6] hover:to-[#8DD2FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </>
  )}
</div>

        </div>

        {/* Indicador de filtros activos y botón limpiar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#8DD2FF] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">
                Filtros aplicados
              </span>
            </div>
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Limpiar todos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogFilter;
