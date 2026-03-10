import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import DashboardPage from './pages/dashboard/DashboardPage'
import IslandsPage from './pages/islands/IslandsPage'
import CreateIslandPage from './pages/islands/CreateIslandPage'
import EditIslandPage from './pages/islands/EditIslandPage'
import LogsPage from './pages/logs/LogsPage'
import SettingsPage from './pages/settings/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <div
        className="flex min-h-screen"
        style={{
          background: '#f2f4e6',
          backgroundImage: 'radial-gradient(#dce2c8 15%, transparent 16%)',
          backgroundSize: '30px 30px',
        }}
      >
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/islands" element={<IslandsPage />} />
            <Route path="/islands/create" element={<CreateIslandPage />} />
            <Route path="/islands/edit/:id" element={<EditIslandPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
