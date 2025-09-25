package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
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

	rows, err := db.Query("SELECT id, title, category, image_url, content FROM articles")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var a Article
		err := rows.Scan(&a.ID, &a.Title, &a.Category, &a.Image, &a.Content)
		if err != nil {
			log.Fatal(err)
		}
		articles = append(articles, a)
	}

	if err := rows.Err(); err != nil {
		log.Fatal(err)
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
	row := db.QueryRow("SELECT id, title, category, image_url, content FROM articles WHERE id = ?", id)
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

	category := strings.TrimPrefix(r.URL.Path, "/api/articles/category/")

	var filteredArticles []Article

	rows, err := db.Query("SELECT id, title, category, image_url, content FROM articles WHERE category = ?", category)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var a Article
		err := rows.Scan(&a.ID, &a.Title, &a.Category, &a.Image, &a.Content)
		if err != nil {
			log.Fatal(err)
		}
		filteredArticles = append(filteredArticles, a)
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(filteredArticles)
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

	http.HandleFunc("/api/articles/category/", categoryHandler)
	http.HandleFunc("/api/articles/", articleHandler)
	http.HandleFunc("/api/articles", articlesHandler)

	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
