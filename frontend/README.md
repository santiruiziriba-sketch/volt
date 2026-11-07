# Volt — Aplicación de entrenamiento

Volt es una aplicación de entrenamiento desarrollada con React que permite generar rutinas personalizadas según el objetivo de entrenamiento, nivel de experiencia, cantidad de días de entrenamiento y equipamiento disponible.

La aplicación utiliza la API de ejercicios de API Ninjas para obtener información sobre los ejercicios.

## Aviso sobre el idioma de los ejercicios

**En esta iteración, los nombres de los ejercicios, las instrucciones y otra información relacionada con los ejercicios pueden aparecer en inglés**, ya que son datos proporcionados por la API de terceros.

La funcionalidad de traducción no está incluida en esta iteración, ya que el objetivo actual es continuar desarrollando y mejorando las funcionalidades principales de la aplicación.

## Funcionalidades principales

- Generación de rutinas según las preferencias del usuario.
- Integración con la API de ejercicios de API Ninjas.
- Filtrado de ejercicios según equipamiento y parámetros de entrenamiento.
- Preloader durante la carga de datos.
- Manejo de errores en las solicitudes a la API.
- Almacenamiento de la rutina generada mediante localStorage.
- Funcionalidad "Mostrar más" para cargar ejercicios progresivamente.
- Diseño responsive.
- Navegación mediante React Router.
- Componente modal reutilizable.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router
- CSS
- Fetch API
- API Ninjas

## Instalación y ejecución

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Crear la versión de producción:

```bash
npm run build
```

Ejecutar ESLint:

```bash
npm run lint
```
