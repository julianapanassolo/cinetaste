import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import FeaturedSection from './components/FeaturedSection'
import ArticleGrid from './components/ArticleGrid'
import Sidebar from './components/Sidebar'
import ArticleDetail from './components/ArticleDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './components/CategoryPage'
import Home from './components/Home'

function HomePage() {
  return (
    <main className='main-content'>
      <section className='featured-section'>
        <FeaturedSection />
      </section>
      <section className='grid-section'>
        <ArticleGrid />
      </section>
      <aside className='sidebar'>
        <Sidebar />
      </aside>
    </main>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <Router>
      <div className="container">
        <div className='top-bar'>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;