import React from "react";
import './FeaturedSection.css';

function FeaturedSection() {
    const featuredArticle = {
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGNpbmVtYXxlbnwwfHwwfHx8MA%3D%3D',
        category: 'Destaque',
        title: 'CineTaste'
    }

    return (
        <section className="featured-container">
            <div className="featured-image-container">
            </div>
            <div className="featured-content">
                <span className="featured-category">{featuredArticle.category}</span>
                <h2 className="featured-title">{featuredArticle.title}</h2>
            </div>
        </section>
    )
}

export default FeaturedSection