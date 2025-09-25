import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import ArticleGrid from './ArticleGrid'
import FeaturedSection from './FeaturedSection'
import Sidebar from './Sidebar'
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
            <section className="featured-section">
                <FeaturedSection />
            </section>
            <section className="grid-section">
                <h2 className="category-title">{categoryName}</h2>
                <ArticleGrid articles={articles} />
            </section>
            <aside className="sidebar">
                <Sidebar />
            </aside>
        </main>
    )
}

export default CategoryPage