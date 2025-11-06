import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import ArticleGrid from '../components/ArticleGrid.jsx';
import Sidebar from '../components/Sidebar.jsx';
import './CategoryPage.css';

function SearchPage({ allArticles }) {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q');

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            setLoading(false);
            return;
        }

        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/articles/search?q=${encodeURIComponent(searchTerm)}`);
                
                if (!response.ok) {
                    throw new Error(`Erro de rede: ${response.status}`);
                }
                
                const data = await response.json();
                setResults(data);

            } catch (e) {
                console.error("Erro ao buscar resultados da pesquisa:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    if (loading) {
        return <div className="loading">Buscando por "{searchTerm}"...</div>;
    }
    
    if (error) {
        return <div className="error">Erro ao carregar resultados: {error}</div>;
    }

    return (
        <main className="main-content">
            <section className="grid-section">
                <h2 className="category-title">
                    Resultados para: "{searchTerm}" 
                    <span className="text-gray-500 font-normal ml-3 text-lg">({results.length} artigos)</span>
                </h2>
                
                {results.length > 0 ? (
                    <ArticleGrid articles={results} />
                ) : (
                    <div className="p-10 text-center text-xl text-gray-700 bg-gray-50 rounded-lg shadow-inner">
                        Nenhum artigo encontrado para a busca "{searchTerm}". Tente um termo diferente.
                    </div>
                )}
            </section>
            
            <aside className="sidebar-container">
                <Sidebar articles={allArticles || []} />
            </aside>
        </main>
    );
}

export default SearchPage;