import React from "react";
import './Sidebar.css'

function Sidebar() {
    const featuredArticle = {
        image: '/o-poderoso-chefao-1.jpg',
        category: 'Destaque',
        title: 'Os 10 filmes para passar o dia sem se mover do sofá!',
    }

    return (
        <aside className="sidebar-container">
            <div className="sidebar-card">
                <img src={featuredArticle.image} />
                <div className="sidebar-content">
                    <span className="sidebar-category">{featuredArticle.category}</span>
                    <h4 className="sidebar-title">{featuredArticle.title}</h4>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar