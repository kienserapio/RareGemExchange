import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/chatbot/Chatbot'
import HomePage from './pages/home/HomePage'
import CollectionPage from './pages/collection/CollectionPage'
import GemDetailPage from './pages/gem/GemDetailPage'
import TeamPage from './pages/team/TeamPage'
import AdminPage from './pages/admin/AdminPage'

function App() {
  // The admin dashboard is a standalone back-office view — it renders without
  // the public site chrome (header, footer, concierge).
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin'

  return (
    <div className="page">
      <div className="page-bg" />

      {!isAdmin && <Header />}

      <main className="page-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gems" element={<CollectionPage />} />
          <Route path="/gems/:id" element={<GemDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}

      {!isAdmin && <Chatbot />}
    </div>
  )
}

export default App
