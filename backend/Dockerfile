# Etapa de build
FROM golang:1.25.0-alpine AS builder

RUN apk add --no-cache git
WORKDIR /app

# Copia dependências
COPY go.mod go.sum ./
RUN go mod download

# Copia todo o código
COPY . .

# Compila a aplicação
RUN go build -o server ./cmd/api

# Imagem final
FROM alpine:3.20
WORKDIR /app

# Copia binário e migrations
COPY --from=builder /app/server .
COPY --from=builder /app/sql ./sql

EXPOSE 8080
CMD ["./server"]
