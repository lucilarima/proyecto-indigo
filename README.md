# Indigo — Frontend

Frontend del TP integrador (UTN · PWA) de la app **Indigo**, una app de organización de equipos de trabajo (tipo Slack + Asana): gestión de proyectos y tareas con autenticación.

Hecho con **React + Vite**. Consume la API del backend de Indigo.

- **App en producción:** https://proyecto-indigo.vercel.app
- **API (backend):** https://proyecto-indigo-backend.onrender.com
- **Repo del backend:** https://github.com/lucilarima/proyecto-indigo-backend

> Nota: el backend usa el plan gratuito de Render y "se duerme" tras inactividad; la primera carga puede tardar ~50 segundos (arranque en frío).

## Stack

- React 19 + Vite
- React Router DOM (ruteo + rutas protegidas)
- Context API (`AuthContext`, `DataContext`)
- Fetch a la API REST del backend (capa en `src/services/api.js`)

## Funcionalidades

- Registro de usuario + verificación de email + login (JWT guardado en `localStorage`).
- Ingreso como **invitado** (usuario demo, sin registrarse).
- Dashboard: crear proyectos, crear/completar/eliminar tareas.
- Agenda: programar tareas por horario, editar y reprogramar.
- Detalle de proyecto con sus tareas.
- Rutas privadas protegidas (si no hay sesión, redirige a login).

## Instalación

1. Instalá dependencias:
   ```
   npm install
   ```
2. Copiá `.env.example` a `.env` y ajustá la URL de la API si hace falta:
   ```
   VITE_API_URL=http://localhost:8080/api
   ```
   (En producción, poné la URL pública del backend + `/api`.)
3. Levantá el frontend:
   ```
   npm run dev
   ```
   Corre en `http://localhost:5173`.

> **Importante:** el backend tiene que estar corriendo (`http://localhost:8080`) para que la app funcione. Ver el repo `proyecto-indigo-backend`.

## Usuario de prueba

- **Email:** `demo@indigo.com`
- **Password:** `Demo1234`

También podés usar el botón **"Entrar como invitado"** en la pantalla de login.

## Build de producción

```
npm run build
```
Genera la carpeta `dist/` lista para desplegar.

## Deploy

- **Frontend:** desplegado en [Vercel](https://vercel.com) → https://proyecto-indigo.vercel.app
- Variable de entorno en Vercel: `VITE_API_URL=https://proyecto-indigo-backend.onrender.com/api`
