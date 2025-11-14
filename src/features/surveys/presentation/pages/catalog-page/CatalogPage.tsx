import type { FunctionComponent } from 'react'
import CatalogFilter from '../../components/catlog-filter/CatalogFilter'
import CatalogTable from '../../components/catalog-table/CatalogTable'

const CatalogPage: FunctionComponent = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <CatalogFilter />
        <CatalogTable />
      </div>
    </div>
  )
}

export default CatalogPage
