import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Help from './pages/Help'
import Results from './pages/Results'
import Feed from './pages/Feed'
import Tasks from './pages/Tasks'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Welcome from './components/Welcome'
import { authService } from './services/auth'
import './App.css'

function Navigation({ mode }) {
  const location = useLocation()
  
  if (mode === 'teacher') {
    return (
      <nav className="bottom-nav">
        <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>📊</Link>
        <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>👤</Link>
      </nav>
    )
  }
  
  return (
    <nav className="bottom-nav">
      <Link to="/feed" className={`nav-item ${location.pathname === '/feed' || location.pathname === '/' ? 'active' : ''}`}>🏠</Link>
      <Link to="/tasks" className={`nav-item ${location.pathname === '/tasks' ? 'active' : ''}`}>📝</Link>
      <Link to="/chat" className={`nav-item ${location.pathname === '/chat' ? 'active' : ''}`}>💬</Link>
      <Link to="/results" className={`nav-item ${location.pathname === '/results' ? 'active' : ''}`}>👥</Link>
      <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>👤</Link>
    </nav>
  )
}

function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function HomeRedirect() {
  const mode = authService.getMode()
  return <Navigate to={mode === 'teacher' ? '/dashboard' : '/feed'} replace />
}

function AppContent() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())
  const [mode, setMode] = useState(authService.getMode())
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Check authentication and mode on route change
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated())
      setMode(authService.getMode())
    }
    checkAuth()
  }, [location])

  useEffect(() => {
    if (isAuthenticated) {
      setShowWelcome(true)
      const timer = setTimeout(() => setShowWelcome(false), 2800)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  return (
    <>
      {showWelcome && <Welcome />}
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><HomeRedirect /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
        {isAuthenticated && <Navigation mode={mode} />}
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
