#!/bin/bash

echo "===== Solucionando error de push a la rama antony-salcedo ====="

# Verificar si estamos en un repositorio git
if [ ! -d .git ]; then
  echo "Este directorio no es un repositorio git. Inicializando..."
  git init
  echo "Repositorio git inicializado."
fi

# Verificar el estado actual
echo "Verificando el estado actual del repositorio..."
git status

# Verificar las ramas existentes
echo "Listando todas las ramas locales..."
git branch

# Asegurarse de que estamos en la rama principal primero
echo "Cambiando a la rama principal (main o master)..."
if git show-ref --verify --quiet refs/heads/main; then
  git checkout main
elif git show-ref --verify --quiet refs/heads/master; then
  git checkout master
else
  echo "No se encontró una rama principal (main o master). Creando rama main..."
  git checkout -b main
fi

# Añadir todos los cambios y hacer commit en la rama principal
echo "Añadiendo todos los cambios al área de preparación..."
git add .

echo "Haciendo commit inicial en la rama principal..."
git commit -m "Commit inicial antes de crear la rama antony-salcedo"

# Ahora crear la rama antony-salcedo
echo "Creando y cambiando a la rama antony-salcedo..."
git checkout -b antony-salcedo

# Hacer otro commit en la rama antony-salcedo para asegurarnos de que tiene contenido
echo "Haciendo commit en la rama antony-salcedo..."
# Modificamos un archivo para asegurarnos de que hay cambios para commit
echo "// Actualizado para la rama antony-salcedo" >> frontend/src/components/Visualizations.js
git add frontend/src/components/Visualizations.js
git commit -m "Actualización del componente Visualizations para la rama antony-salcedo"

# Configurar el repositorio remoto si no está configurado
if ! git remote -v | grep -q origin; then
  echo "Configurando el repositorio remoto..."
  git remote add origin https://github.com/Toony-007/Software-Cualitativo.git
fi

# Intentar hacer push a la rama antony-salcedo
echo "Subiendo la rama antony-salcedo al repositorio remoto..."
git push -u origin antony-salcedo

echo "===== Proceso completado ====="
echo "Si sigues teniendo problemas, intenta estos comandos adicionales:"
echo "git fetch origin"
echo "git pull --rebase origin main"
echo "git push -u origin antony-salcedo"