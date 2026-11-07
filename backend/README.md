# Volt Backend

Backend de la aplicación **Volt**, desarrollado con Node.js, Express y MongoDB.

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Celebrate / Joi
- Helmet
- Express Rate Limit
- ESLint (Airbnb)

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Para producción, crear un archivo `.env` con:

```env
NODE_ENV=production
JWT_SECRET=your_secret_here
MONGO_URI=mongodb://your_mongodb_address
```

El archivo `.env` no debe subirse al repositorio.

## Desarrollo

Para ejecutar el servidor con recarga automática:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## Producción

Para ejecutar el servidor:

```bash
npm run start
```

La API está disponible públicamente en:

```text
https://volt-api.cebollero.com/api
```

Endpoint de prueba:

```text
https://volt-api.cebollero.com/
```

## Endpoints principales

### Autenticación

```text
POST /api/signup
POST /api/signin
```

### Usuarios

```text
GET /api/users/me
```

### Rutinas

```text
GET /api/routines
POST /api/routines
DELETE /api/routines/:routineId
```

Las rutas protegidas requieren autenticación mediante JWT.

## Verificación

El proyecto fue verificado mediante:

```bash
npm run dev
npm run start
npx eslint .
```

También se probaron:

- Registro de usuarios
- Inicio de sesión
- Autenticación mediante JWT
- Rutas protegidas
- Creación, consulta y eliminación de rutinas
- Validación de datos
- Manejo de errores
- Protección contra eliminación de rutinas de otros usuarios
- Funcionamiento de la API en producción mediante HTTPS
