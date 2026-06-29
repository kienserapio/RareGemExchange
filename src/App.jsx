import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/chatbot/Chatbot'
import HomePage from './pages/home/HomePage'
import CollectionPage from './pages/collection/CollectionPage'
import GemDetailPage from './pages/gem/GemDetailPage'

function App() {
  return (
    <div className="page">
      <div className="page-bg" />

      <Header />

      <main className="page-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gems" element={<CollectionPage />} />
          <Route path="/gems/:id" element={<GemDetailPage />} />
        </Routes>
      </main>

      <Footer />

      <Chatbot />
    </div>
  )
}

export default App
