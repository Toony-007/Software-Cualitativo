#!/bin/bash

echo "===== Haciendo nuevo commit con la última actualización ====="

# Verificar si estamos en la rama antony-salcedo
current_branch=$(git branch --show-current)
if [ "$current_branch" != "antony-salcedo" ]; then
  echo "Actualmente estás en la rama: $current_branch"
  echo "Cambiando a la rama antony-salcedo..."
  git checkout antony-salcedo
  if [ $? -ne 0 ]; then
    echo "Error al cambiar a la rama antony-salcedo. Asegúrate de que existe."
    exit 1
  fi
fi

# Añadir el archivo Visualizations.js al área de preparación
echo "Añadiendo el archivo Visualizations.js al área de preparación..."
git add frontend/src/components/Visualizations.js

# Verificar si hay cambios para hacer commit
if git diff --cached --quiet; then
  echo "No se detectaron cambios en el archivo Visualizations.js para hacer commit."
  echo "Si acabas de modificar el archivo, asegúrate de que los cambios están guardados."
  exit 1
fi

# Hacer commit de los cambios
echo "Haciendo commit de la última actualización..."
git commit -m "Actualización del componente Visualizations con las últimas modificaciones"

# Hacer push de los cambios
echo "Subiendo los cambios al repositorio remoto..."
git push origin antony-salcedo

echo "===== Proceso completado ====="
echo "Se ha realizado un nuevo commit con la última actualización del archivo Visualizations.js"
echo "y se ha subido a la rama antony-salcedo en el repositorio remoto."