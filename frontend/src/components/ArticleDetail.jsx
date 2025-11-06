import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import './ArticleDetail.css';

function ArticleDetail() {
    const { id } = useParams()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/articles/${id}`)
                if (!response.ok) {
                    throw new Error(`Erro de rede: ${response.status}`)
                }
                const data = await response.json()
                setArticle(data)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        fetchArticle()
    }, [id])

    if (loading) {
        return <div className="loading">Carregando artigo...</div>
    }
    if (error) {
        return <div className="error">Erro: {error}</div>
    }
    if (!article) {
        return <div className="not-found">Artigo não encontrado.</div>
    }

    return (
        <div className="article-detail-container">
            <h1 className="article-title">{article.title}</h1>
            <span className="article-category">{article.category}</span>
            <div className="article-image-container">
                <img src={article.image} alt={article.title} className="article-image" />
            </div>
            <p
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </div>
    )
}

export default ArticleDetail