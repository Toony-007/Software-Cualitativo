# Instrucciones para subir cambios a la rama antony-salcedo

## Opción 1: Usando el script automatizado

He creado un script que automatiza el proceso de subir tus cambios a la rama `antony-salcedo`. Para usarlo:

1. Abre una terminal en la raíz del proyecto
2. Ejecuta los siguientes comandos:

```bash
# Dar permisos de ejecución al script
chmod +x git-upload.sh

# Ejecutar el script
./git-upload.sh
```

El script realizará automáticamente los siguientes pasos:
- Verificar si estás en un repositorio git (o inicializar uno si es necesario)
- Verificar si la rama antony-salcedo existe (o crearla si es necesario)
- Cambiar a la rama antony-salcedo
- Añadir todos los cambios al área de preparación
- Hacer commit de los cambios
- Intentar hacer push a la rama remota (si existe un repositorio remoto configurado)

## Opción 2: Comandos manuales de Git

Si prefieres ejecutar los comandos manualmente, sigue estos pasos:

```bash
# Verificar el estado actual
git status

# Añadir todos los cambios
git add .

# Si quieres añadir solo archivos específicos
# git add frontend/src/components/Visualizations.js

# Hacer commit de los cambios
git commit -m "Actualización del componente Visualizations y otros archivos del proyecto"

# Verificar si la rama antony-salcedo existe
git branch

# Si la rama no existe, crearla y cambiar a ella
git checkout -b antony-salcedo

# Si la rama ya existe, cambiar a ella
git checkout antony-salcedo

# Hacer push de los cambios a la rama remota
git push -u origin antony-salcedo
```

## Notas importantes

- Si no tienes un repositorio remoto configurado, necesitarás añadirlo con:
  ```bash
  git remote add origin <url-del-repositorio>
  ```

- Si es la primera vez que usas git en este equipo, puede que necesites configurar tu identidad:
  ```bash
  git config --global user.name "Tu Nombre"
  git config --global user.email "tu.email@ejemplo.com"
  ```

- Si encuentras algún error relacionado con conflictos, puede que necesites hacer un pull antes de push:
  ```bash
  git pull origin antony-salcedo
  ```