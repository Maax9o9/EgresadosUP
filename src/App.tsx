import { useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import Layout from './shared/components/layout/Layout'
import HomePage from './features/home/HomePage'

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
      <HomePage />
    </Layout>
  )
}

export default App
