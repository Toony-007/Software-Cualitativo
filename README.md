# Qualitative AI Analyzer

Una aplicación para análisis cualitativo de datos utilizando inteligencia artificial con DeepSeek.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **Backend**: API REST desarrollada con FastAPI en Python
- **Frontend**: Interfaz de usuario desarrollada con React

## Requisitos

- Python 3.8+
- Node.js 14+
- Docker y Docker Compose (opcional)

## Configuración

### Backend

1. Navega al directorio del backend:
   ```
   cd backend
   ```

2. Crea un entorno virtual:
   ```
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```

4. Copia el archivo `.env.example` a `.env` y configura las variables de entorno:
   ```
   cp .env.example .env
   ```

5. Inicia el servidor:
   ```
   uvicorn app.main:app --reload
   ```

### Frontend

1. Navega al directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Copia el archivo `.env.example` a `.env` y configura las variables de entorno:
   ```
   cp .env.example .env
   ```

4. Inicia el servidor de desarrollo:
   ```
   npm start
   ```

## Uso con Docker

Para iniciar toda la aplicación con Docker Compose:

```
docker-compose up -d
```

## Licencia

[@Antony Salcedo (salcedoantony007@gmail.com), @Camilo Zambrano (secc96@gmail.com), @Juan Santacruz (juan10santacruz@gmail.com)](LICENSE)