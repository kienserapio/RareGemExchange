import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Standards from './components/Standards'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'
import Chatbot from './components/chatbot/Chatbot'

function App() {
  return (
    <div className="page">
      <div className="page-bg" />

      <Header />

      <main className="page-main">
        <Hero />
        <About />
        <Standards />
        <Testimonials />
        <Faq />
        <ComingSoon />
      </main>

      <Footer />

      <Chatbot />
    </div>
  )
}

export default App
