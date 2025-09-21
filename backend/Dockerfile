FROM golang:1.25.0-alpine

# Instale o git para que o 'go get' funcione
RUN apk add --no-cache git

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependência do Go e baixe as dependências
COPY go.mod go.sum ./
RUN go mod download

# Instale o Air em um diretório padrão do PATH
# O "go install" vai instalar o binário no diretório $GOPATH/bin, que já está no PATH
RUN go install github.com/air-verse/air@latest

# Copie o código fonte
COPY . .

# Exponha a porta
EXPOSE 8080

# Execute a aplicação com o Air. Não é necessário o caminho completo, pois 'air' está no PATH.
CMD ["air", "-c", ".air.toml"]