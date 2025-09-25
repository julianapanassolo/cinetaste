import React from "react";
import { Link } from 'react-router-dom'
import './Header.css';
import { Film } from 'lucide-react'

function getFormattedDate() {
    const date = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('pt-BR', options).toUpperCase()
}

function Header() {
    const currentDate = getFormattedDate()
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <div className="logo">
                        <Film />
                        <Link to="/">CineTaste</Link>
                    </div>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/category/Noticias">Notícias</Link></li>
                        <li><Link to="/category/Streaming">Streaming</Link></li>
                        <li><Link to="/category/Crítica">Críticas</Link></li>
                        <li><Link to="/category/Entrevista">Entrevistas</Link></li>
                    </ul>
                </nav>
                <div className="header-info">
                    <span className="current-date">{currentDate}</span>
                    <div className="search-box">
                        <input type="text" placeholder="Pesquisar..." />
                        <button type="submit">🔍</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;