import React from "react";
import { Link } from 'react-router-dom'
import './ArticleCard.css'

function ArticleCard({ article }) {
    return (
        <Link to={`/article/${article.id}`} className="article-card-link">
        <div className="article-card">
            <div className="card-image-container">
                <img src={article.image} alt={article.title} className="card-image" />
            </div>
            <div className="card-content">
                <span className="card-category">{article.category}</span>
                <h3 className="card-title">{article.title}</h3>
            </div>
        </div>
        </Link>
    )
}

export default ArticleCard