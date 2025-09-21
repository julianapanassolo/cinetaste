package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type Article struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Category string `json:"category"`
	Image    string `json:"image"`
	Content  string `json:"content"`
}

var articles = []Article{
	{
		ID:       1,
		Title:    "Crítica: Uma Sexta-Feira Muito Louca",
		Category: "Crítica",
		Image:    "https://br.web.img2.acsta.net/img/6f/66/6f66138617975f82a2117bb7870681ed.jpg",
		Content:  "Este é o conteúdo completo do artigo sobre a crítica do filme 'Uma Sexta-Feira Muito Louca'. A trama segue a história de uma mãe e filha que trocam de corpos...",
	},
	{
		ID:       2,
		Title:    "Netflix cancela nove séries de ficção popular em 2024",
		Category: "Notícias",
		Image:    "https://br.web.img3.acsta.net/img/45/bd/45bd72e7b3fc7e95146a36d7a8d18bed.jpg",
		Content:  "A Netflix decidiu cortar nove de suas séries originais, gerando descontentamento entre os fãs. As razões para os cancelamentos incluem custos de produção e...",
	},
	{
		ID:       3,
		Title:    "Os 10 melhores filmes de todos os tempos, segundo o Rotten Tomatoes",
		Category: "Streaming",
		Image:    "/o-poderoso-chefao-1.jpg",
		Content:  "O ranking dos melhores filmes de todos os tempos foi atualizado pelo famoso agregador de críticas, Rotten Tomatoes. A lista conta com clássicos como 'O Poderoso Chefão', 'Pulp Fiction' e...",
	},
	{
		ID:       4,
		Title:    "Atriz de 'Invocação do Mal 4' revela assombrações durante as filmagens",
		Category: "Entrevista",
		Image:    "https://www.bnewssaopaulo.com.br/media/_versions/2025/09/whatsapp-image-2025-09-01-at-204528_widelg.jpeg",
		Content:  "Em uma entrevista exclusiva, a atriz de 'Invocação do Mal 4' compartilhou experiências assustadoras nos bastidores, afirmando que a equipe se sentiu...",
	},
}

func articlesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
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
	for _, article := range articles {
		if article.ID == id {
			json.NewEncoder(w).Encode(article)
			return
		}
	}
	http.NotFound(w, r)
}

func categoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	category := strings.TrimPrefix(r.URL.Path, "/api/articles/category/")

	var filteredArticles []Article
	for _, article := range articles {
		if strings.EqualFold(article.Category, category) {
			filteredArticles = append(filteredArticles, article)
		}
	}
	json.NewEncoder(w).Encode(filteredArticles)
}

func main() {
	http.HandleFunc("/api/articles/category/", categoryHandler)
	http.HandleFunc("/api/articles/", articleHandler)
	http.HandleFunc("/api/articles", articlesHandler)

	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
