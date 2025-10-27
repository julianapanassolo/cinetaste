import React, { useState, useEffect } from "react";
import ArticleGrid from './ArticleGrid.jsx'
import FeaturedSection from './FeaturedSection.jsx'
import Sidebar from './Sidebar.jsx'
import './Home.css'

function Home() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const pageTitle = "Últimas Notícias"

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/articles`);
                if (!response.ok) {
                    throw new Error(`Erro de rede: ${response.status}`)
                }
                const data = await response.json()
                setArticles(data)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        fetchArticles()
    }, [])

    if (loading) {
        return <div className="loading">Carregando a página inicial...</div>
    }
    if (error) {
        return <div className="error">Erro: {error}</div>
    }

    const featuredArticle = articles.find(a => a.category === 'Home')
    const remainingArticles = articles.filter(a => a.category !== 'Home')

    return (
        <main className="main-content">
            <section className="featured-section-container">
                {featuredArticle && <FeaturedSection article={featuredArticle} />}
            </section>
            <section className="grid-section">
                <h2 className="category-title">{pageTitle}</h2>
                <ArticleGrid articles={remainingArticles} />
            </section>
            <aside className="sidebar-container">
                <Sidebar articles={articles} />
            </aside>
        </main>
    )
}

export default Home