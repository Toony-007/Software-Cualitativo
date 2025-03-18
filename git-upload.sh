#!/bin/bash

# Script para subir cambios a la rama antony-salcedo

echo "===== Subiendo cambios a la rama antony-salcedo ====="

# Verificar si estamos en un repositorio git
if [ ! -d .git ]; then
  echo "Este directorio no es un repositorio git. Inicializando..."
  git init
  echo "Repositorio git inicializado."
fi

# Verificar rama actual
current_branch=$(git branch --show-current)
echo "Rama actual: $current_branch"

# Verificar si la rama antony-salcedo existe
if git show-ref --verify --quiet refs/heads/antony-salcedo; then
  echo "La rama 'antony-salcedo' existe."
  
  # Si no estamos en la rama antony-salcedo, cambiar a ella
  if [ "$current_branch" != "antony-salcedo" ]; then
    echo "Cambiando a la rama 'antony-salcedo'..."
    git checkout antony-salcedo
  fi
else
  echo "La rama 'antony-salcedo' no existe. Creándola..."
  git checkout -b antony-salcedo
  echo "Rama 'antony-salcedo' creada y seleccionada."
fi

# Añadir todos los cambios
echo "Añadiendo todos los cambios al área de preparación..."
git add .

# Hacer commit de los cambios
echo "Haciendo commit de los cambios..."
git commit -m "Actualización del componente Visualizations y otros archivos del proyecto"

# Hacer push al repositorio remoto (si existe)
echo "Subiendo al repositorio remoto..."
if git remote -v | grep -q origin; then
  git push -u origin antony-salcedo
  echo "Cambios subidos al repositorio remoto."
else
  echo "No se encontró un repositorio remoto. Necesitas añadir un repositorio remoto con:"
  echo "git remote add origin <url-de-tu-repositorio>"
  echo "Luego sube tus cambios con:"
  echo "git push -u origin antony-salcedo"
fi

echo "===== Proceso completado ====="