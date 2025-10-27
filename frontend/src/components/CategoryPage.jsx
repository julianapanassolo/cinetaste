import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import ArticleGrid from './ArticleGrid.jsx'
import FeaturedSection from './FeaturedSection.jsx'
import Sidebar from './Sidebar.jsx'
import './CategoryPage.css'

function CategoryPage() {
    const { categoryName } = useParams()
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchArticlesByCategory = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/articles/category/${categoryName}`);
                if (!response.ok) {
                    console.error("URL da API que falhou:", `/api/articles/category/${categoryName}`)
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
    }, [categoryName])

    if (loading) {
        return <div className="loading">Carregando artigos de {categoryName}...</div>
    }
    if (error) {
        return <div className="error">Erro: {error}</div>
    }

    return (
        <main className="main-content">

            <section className="grid-section">
                <h2 className="category-title">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
                <ArticleGrid articles={articles} />
            </section>

            <aside className="sidebar-container">
                <Sidebar articles={articles} />
            </aside>
        </main>
    )
}

export default CategoryPage