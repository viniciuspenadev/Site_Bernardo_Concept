FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Astro gera arquivos estáticos: tudo o que o site precisa saber entra AQUI, na build.
# Variável de ambiente configurada no Easypanel é de runtime do contêiner e NÃO chega
# até esta etapa — para sobrescrever qualquer uma delas, use build args.
ARG PUBLIC_SITE_URL
ARG PUBLIC_ALLOW_INDEXING=false
ARG PUBLIC_LEAD_ENDPOINT
ARG PUBLIC_LEAD_TOKEN
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV PUBLIC_ALLOW_INDEXING=$PUBLIC_ALLOW_INDEXING
ENV PUBLIC_LEAD_ENDPOINT=$PUBLIC_LEAD_ENDPOINT
ENV PUBLIC_LEAD_TOKEN=$PUBLIC_LEAD_TOKEN
RUN npm run build

# O destino do lead tem padrão em src/data/lead-form.ts, então o formulário funciona
# mesmo sem nenhum build arg. Esta verificação impede que uma build vá para produção
# com o formulário desligado.
RUN grep -q "script.google.com/macros" dist/index.html \
  || (echo "ERRO: build sem endpoint de leads — o formulário sairia desligado." && exit 1)

FROM nginx:1.30-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
