import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import './ArticleGrid.css';

function ArticleGrid() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    
    if (!propArticles) {
      const fetchArticles = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/articles')
          if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`)
          }
          const data = await response.json()
          setArticles(data);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false)
        }
      }
      fetchArticles()
    }
  }, [propArticles])

  if (loading) {
    return <div className="loading">Carregando artigos...</div>;
  }
  if (error) {
    return <div className="error">Erro: {error}</div>;
  }
  if (articles.length === 0) {
    return <div className="no-articles">Nenhum artigo encontrado.</div>;
  }

  return (
    <div className="article-grid">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleGrid;