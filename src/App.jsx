import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TopNav from './components/TopNav'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import { AuthProvider } from './context/AuthContext' // ✅ Import AuthProvider

function AppContent() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-violet-50 flex flex-col">
      <TopNav />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>

      {/* ✅ Hide footer only on /chat */}
      {location.pathname !== "/chat" && (
        <footer className="py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Zetiify — Prototype built with React + Tailwind.
        </footer>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
