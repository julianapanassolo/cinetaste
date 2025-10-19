import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import ArticleGrid from './ArticleGrid'
import FeaturedSection from './FeaturedSection'
import Sidebar from './Sidebar'
import './CategoryPage.css'
import CategoryPage from "./CategoryPage";

function Home() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const pageTitle = "Últimas Notícias"

    useEffect(() => {
        const fetchArticlesByCategory = async () => {
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
        fetchArticlesByCategory()
    }, [])

    if (loading) {
        return <div className="loading">Carregando artigos de {CategoryPage}...</div>
    }
    if (error) {
        return <div className="error">Erro: {error}</div>
    }

    return (
        <main className="main-content">
            <section className="featured-section">
                <FeaturedSection />
            </section>
            <section className="grid-section">
                <h2 className="category-title">{pageTitle}</h2>
                <ArticleGrid articles={articles} />
            </section>
            <aside className="sidebar">
                <Sidebar />
            </aside>
        </main>
    )
}

export default Home