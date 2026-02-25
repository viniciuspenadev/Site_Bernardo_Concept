# Estágio de Build
FROM node:18-alpine as builder

WORKDIR /app

# Copiar dependências
COPY package*.json ./
RUN npm install

# Copiar código fonte
COPY . .

# Buildar o projeto
RUN npm run build

# Estágio de Produção
FROM nginx:alpine

# Copiar build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
