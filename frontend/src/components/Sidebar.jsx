import React from "react";
import { Link } from 'react-router-dom';
import './Sidebar.css'

function SidebarArticleCard({ article }) {

    return (
        <Link to={`/article/${article.id}`} className="sidebar-link">
            <div className="sidebar-card">
                <img src={article.image} alt={article.title} />
                <div className="sidebar-content">
                    <span className="sidebar-category">{article.category}</span>
                    <h4 className="sidebar-title">{article.title}</h4>
                </div>
            </div>
        </Link>
    )
}

function Sidebar({ articles }) {

    const filteredArticles = articles.filter(a => a.category !== 'Home')
    const popularArticles = filteredArticles
        .sort((a, b) => b.id - a.id)
        .slice(0, 4)

    return (
        <aside className="sidebar-container">
            <h3 className="sidebar-heading">🔥 Mais Populares</h3>
            <div className="sidebar-grid">
                {popularArticles.map(article => (
                    <SidebarArticleCard key={article.id} article={article} />
                ))}
            </div>
        </aside>
    )
}

export default Sidebar