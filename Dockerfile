FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG PUBLIC_SITE_URL
ARG PUBLIC_ALLOW_INDEXING=false
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV PUBLIC_ALLOW_INDEXING=$PUBLIC_ALLOW_INDEXING
RUN npm run build

FROM nginx:stable-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
