import { useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import Layout from './shared/components/layout/Layout'
import HomePage from './features/home/HomePage'
import RespondentsPage from './features/form/presentation/page/respondents-page/RespondentsPage'
import CatalogPage from './features/form/presentation/page/catalog-page/CatalogPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  const { login } = useAuth()

  // Simular un login automático para poder ver el Layout
  useEffect(() => {
    login({
      name: 'Usuario Demo',
      email: 'demo@exaup.com',
      id: '1'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Solo ejecutar una vez al montar el componente

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
  <Route path="/respondents" element={<RespondentsPage />} />
  <Route path="/survey-catalog" element={<CatalogPage />} />
      </Routes>
    </Layout>
  )
}

export default App
