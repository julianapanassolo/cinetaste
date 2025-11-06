package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	// "os"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

type Article struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Category string `json:"category"`
	Image    string `json:"image"`
	Content  string `json:"content"`
}

var db *sql.DB

func articlesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	var articles []Article

	rows, err := db.Query("SELECT id, title, category, image, content FROM articles")
	if err != nil {
		log.Println("Erro ao buscar todos os artigos:", err)
		http.Error(w, "Erro ao buscar artigos", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var a Article
		err := rows.Scan(&a.ID, &a.Title, &a.Category, &a.Image, &a.Content)
		if err != nil {
			log.Println("Erro ao escanear linha em articlesHandler:", err)
			continue
		}
		articles = append(articles, a)
	}

	if err := rows.Err(); err != nil {
		log.Println("Erro após iteração em articlesHandler:", err)
		http.Error(w, "Erro ao processar resultados", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(articles)
}

func articleHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	idStr := strings.TrimPrefix(r.URL.Path, "/api/articles/")

	if idStr == "" {
		http.NotFound(w, r)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}
	var article Article
	row := db.QueryRow("SELECT id, title, category, image, content FROM articles WHERE id = ?", id)
	err = row.Scan(&article.ID, &article.Title, &article.Category, &article.Image, &article.Content)
	if err != nil {
		if err == sql.ErrNoRows {
			http.NotFound(w, r)
			return
		}
		http.Error(w, "Erro ao buscar artigo", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(article)
}

func categoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	categoryPath := strings.TrimPrefix(r.URL.Path, "/api/articles/category/")

	category := strings.TrimSpace(strings.TrimSuffix(categoryPath, "/"))

	log.Println("Buscando Categoria (final e limpa):", category)

	var filteredArticles []Article

	rows, err := db.Query("SELECT id, title, category, image, content FROM articles WHERE category = ?", category)
	if err != nil {
		log.Println("Erro ao buscar artigos por categoria", err)
		http.Error(w, "Erro ao buscar artigos por categoria", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var a Article
		err := rows.Scan(&a.ID, &a.Title, &a.Category, &a.Image, &a.Content)
		if err != nil {
			log.Println("Erro ao escanear linha em categoryHandler", err)
			continue
		}
		filteredArticles = append(filteredArticles, a)
	}
	if err := rows.Err(); err != nil {
		log.Println("Erro após iteração em categoryHandler:", err)
		http.Error(w, "Erro ao processar resultados da categoria", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(filteredArticles)
}

func createArticleHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}
	var newArticle Article
	err := json.NewDecoder(r.Body).Decode(&newArticle)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	result, err := db.Exec("INSERT INTO articles (title, category, image, content) VALUES (?, ?, ?, ?)",
		newArticle.Title, newArticle.Category, newArticle.Image, newArticle.Content)
	if err != nil {
		http.Error(w, "Erro ao inserir artigo no banco de dados", http.StatusInternalServerError)
		return
	}
	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, "Erro ao obter ID do artigo", http.StatusInternalServerError)
		return
	}
	newArticle.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newArticle)
}

// NOVO: Adicione esta função ao seu código Go
func searchHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	searchTerm := r.URL.Query().Get("q")

	if searchTerm == "" {
		json.NewEncoder(w).Encode([]Article{})
		return
	}

	query := `
        SELECT id, title, category, image, content 
        FROM articles 
        WHERE title LIKE CONCAT('%', ?, '%') OR content LIKE CONCAT('%', ?, '%')
    `
	searchParam := searchTerm

	var searchResults []Article

	rows, err := db.Query(query, searchParam, searchParam)
	if err != nil {
		log.Println("Erro ao buscar artigos por termo:", err)
		http.Error(w, "Erro ao realizar busca", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var a Article
		err := rows.Scan(&a.ID, &a.Title, &a.Category, &a.Image, &a.Content)
		if err != nil {
			log.Println("Erro ao escanear linha em searchHandler:", err)
			continue
		}
		searchResults = append(searchResults, a)
	}

	if err := rows.Err(); err != nil {
		log.Println("Erro após iteração em searchHandler:", err)
		http.Error(w, "Erro ao processar resultados da busca", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(searchResults)
}

func main() {
	var err error
	db, err = sql.Open("mysql", "root:cinetaste_password@tcp(cinetaste-mysql:3306)/cinetaste_database?parseTime=true")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Conectado ao banco de dados")

	http.HandleFunc("/api/articles/search", searchHandler)
	http.HandleFunc("/api/articles/create", createArticleHandler)
	http.HandleFunc("/api/articles/category/", categoryHandler)

	http.HandleFunc("/api/articles/", articleHandler)
	http.HandleFunc("/api/articles", articlesHandler)

	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
