import React from "react";
import { Link } from 'react-router-dom';
import './FeaturedSection.css';

function FeaturedSection({ article }) {
    if (!article) {
        return <div className="featured-loading">Nenhum artigo em destaque.</div>;
    }

    const featuredStyle = {
        backgroundImage: `url(${article.image})`
    }

    return (
        <Link to={`/article/${article.id}`} className="featured-link">
            <section className="featured-container" style={featuredStyle}>
                <div className="featured-overlay"></div>

                <div className="featured-content">
                    <span className="featured-category">{article.category}</span>
                    <h2 className="featured-title">{article.title}</h2>
                </div>
            </section>
        </Link>
    )
}

export default FeaturedSection