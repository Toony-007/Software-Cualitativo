# Etapa de construcción
FROM node:16-alpine as build

WORKDIR /app

# Copiar package.json, package-lock.json y .npmrc
COPY package*.json .npmrc ./

# Limpiar caché de npm para evitar problemas con dependencias anteriores
RUN npm cache clean --force

# Instalar dependencias con --legacy-peer-deps para manejar conflictos
RUN npm install --legacy-peer-deps

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar archivos de construcción a nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

# Etapa de producción
FROM nginx:alpine

# Copiar archivos de construcción a nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]