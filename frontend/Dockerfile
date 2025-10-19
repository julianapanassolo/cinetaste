# Etapa 1: Build da aplicação
# Use uma imagem base do Node.js
FROM node:20-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copie o código fonte
COPY . .

# Crie o build da aplicação
RUN npm run build

# Etapa 2: Servir a aplicação
# Use uma imagem Nginx leve para servir os arquivos estáticos
FROM nginx:stable-alpine

# Copie o build da aplicação da etapa anterior para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copie o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponha a porta
EXPOSE 3000