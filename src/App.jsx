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
import CaseStudyPage from './pages/casestudy/CaseStudyPage'

function App() {
  // The admin dashboard and the case-study page are standalone views — they
  // render without the public site chrome (header, footer, concierge). The
  // case study is a self-contained page meant to be linked from elsewhere.
  const { pathname } = useLocation()
  const isBare = pathname === '/admin' || pathname === '/case-study'

  return (
    <div className="page">
      <div className="page-bg" />

      {!isBare && <Header />}

      <main className="page-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gems" element={<CollectionPage />} />
          <Route path="/gems/:id" element={<GemDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/case-study" element={<CaseStudyPage />} />
        </Routes>
      </main>

      {!isBare && <Footer />}

      {!isBare && <Chatbot />}
    </div>
  )
}

export default App
