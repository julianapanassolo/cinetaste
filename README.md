# 🎬 CineTaste: Plataforma de Notícias e Críticas de Cinema (Go + React + MySQL)

Este projeto demonstra a construção de uma aplicação web completa (Full Stack) utilizando a arquitetura Docker Compose.

## ✨ Funcionalidades Implementadas

* **Arquitetura:** Aplicação modularizada em três serviços Docker (Frontend, Backend, Banco de Dados).
* **Backend (Go):** API RESTful desenvolvida em Go, conectada ao MySQL. Inclui rotas para Artigos, Categorias e uma rota otimizada de **Busca (`/api/articles/search?q=`)**.
* **Frontend (React):** Interface moderna e responsiva.
    * **Navegação por Categoria:** Exibe artigos filtrados por 'Notícias', 'Críticas', etc.
    * **Funcionalidade de Busca:** Pesquisa em tempo real por Título e Conteúdo.
* **Banco de Dados (MySQL):** Persistência de dados garantida por volumes Docker, inicializado automaticamente com o conteúdo inicial.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Inicialização

1.  **Clone o repositório:**
    ```bash
    git clone [SUA_URL_DO_REPOSITÓRIO]
    cd [pasta-do-projeto]
    ```
2.  **Inicie os serviços:** O comando `up` irá construir as imagens do Go e do React, e inicializar o banco de dados MySQL com os dados iniciais (`init.sql`).
    ```bash
    docker-compose up --build -d
    ```
3.  **Acesse a Aplicação:**
    * Frontend (Navegador): `http://localhost:3000/`
    * Backend API (Go): `http://localhost:8080/api/articles`

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React, HTML/CSS
* **Backend:** Go (Linguagem Go)
* **Banco de Dados:** MySQL
* **Orquestração:** Docker e Docker Compose

---