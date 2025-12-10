import { useState, useMemo, type FunctionComponent } from 'react';
import TableFilter from '../../components/table-filter/TableFilter';
import Table from '../../components/table/Table';
import { useFormList } from '../../hooks/useFormList';

const RespondentsPage: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCount, setSelectedCount] = useState(0);

  const { forms, isLoading } = useFormList();

  const surveys = useMemo(() => {
    return forms.map(form => ({
      id: form.id,
      title: form.titulo,
      description: form.descripcion,
      dateCreated: form.fechaCreacion || new Date().toISOString(),
      career: "",
      sent: 0,
      responded: 0,
      notResponded: 0
    }));
  }, [forms]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <TableFilter 
          selectedCount={selectedCount}
          totalSurveys={surveys.length}
          onSearchChange={setSearchTerm}
          onCareerChange={setSelectedCareer}
          onDateChange={setSelectedDate}
          onSortChange={setSortBy}
        />
        <Table 
          surveys={surveys}
          isLoading={isLoading}
          searchTerm={searchTerm}
          selectedCareer={selectedCareer}
          selectedDate={selectedDate}
          sortBy={sortBy}
          onSelectionChange={setSelectedCount}
        />
      </div>
    </div>
  );
};

export default RespondentsPage;
