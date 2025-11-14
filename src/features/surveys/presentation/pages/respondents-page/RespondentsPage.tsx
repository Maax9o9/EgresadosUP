import type { FunctionComponent } from 'react';
import TableFilter from '../../components/table-filter/TableFilter';
import Table from '../../components/table/Table';

const RespondentsPage: FunctionComponent = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <TableFilter />
        <Table />
      </div>
    </div>
  );
};

export default RespondentsPage;
