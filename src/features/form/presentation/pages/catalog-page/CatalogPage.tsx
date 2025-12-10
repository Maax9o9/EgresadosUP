import { useState } from "react";
import CatalogFilter from "../../components/catlog-filter/CatalogFilter";
import CatalogTable from "../../components/catalog-table/CatalogTable";
export default function SurveysCatalogPage() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <CatalogFilter 
          selectedCount={selectedCount}
          totalSurveys={8}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onDateChange={setSelectedDate}
          onSortChange={setSortBy}
        />
        <CatalogTable 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
          sortBy={sortBy}
          onSelectionChange={setSelectedCount}
        />
      </div>
    </div>
  );
}
