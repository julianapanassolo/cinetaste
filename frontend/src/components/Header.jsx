import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './Header.css';
import { Home, Newspaper, MonitorPlay, MessageCircle, Mic, Film } from 'lucide-react'

function getFormattedDate() {
    const date = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('pt-BR', options).toUpperCase()
}

function Header() {
    const currentDate = getFormattedDate()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            window.location.href = `/search?q=${searchTerm}`
        }
    }
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <div className="logo">
                        <Film size={30} />
                        <Link to="/">CineTaste</Link>
                    </div>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/"><Home size={18} /> Home</Link></li>
                        <li><Link to="/category/Noticias"><Newspaper size={18} /> Notícias</Link></li>
                        <li><Link to="/category/Streaming"><MonitorPlay size={18} /> Streaming</Link></li>
                        <li><Link to="/category/Critica"><MessageCircle size={18} /> Críticas</Link></li>
                        <li><Link to="/category/Entrevista"><Mic size={18} /> Entrevistas</Link></li>
                    </ul>
                </nav>
                <div className="header-info">
                    <span className="current-date">{currentDate}</span>
                    <form onSubmit={handleSearch} className="search-box">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">🔍</button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header;