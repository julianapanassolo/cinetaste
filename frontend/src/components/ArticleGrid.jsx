import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard.jsx';
import './ArticleGrid.css';

function ArticleGrid({ articles }) {
  const [componentArticles, setComponentArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (articles && Array.isArray(articles)) {
      setComponentArticles(articles)
      setLoading(false)
    } else {
      const fetchArticles = async () => {
        try {
          const response = await fetch('/api/articles')
          if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`)
          }
          const data = await response.json()
          setComponentArticles(data)
        } catch (e) {
          setError(e.message)
        } finally {
          setLoading(false)
        }
      }
      fetchArticles()
    }
  }, [articles])

  if (loading) {
    return <div className="loading">Carregando artigos...</div>;
  }
  if (error) {
    return <div className="error">Erro: {error}</div>;
  }
  if (componentArticles.length === 0) {
    return <div className="no-articles">Nenhum artigo encontrado.</div>;
  }

  return (
    <div className="article-grid">
      {componentArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleGrid;