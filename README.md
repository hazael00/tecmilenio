# Flow · Andy Demo (Hotel Guadalajara Express)

## Estructura
- `index.html` — UI estilo iOS: video vertical del avatar + chat a la derecha
- `public/andysup.png` — poster/placeholder y avatar en el chat
- `api/chat.js` — endpoint serverless con Gemini 1.5 Flash
- `package.json` — dependencias y scripts
- `vercel.json` — configuración de rutas en Vercel
- `.env.example` — variable de entorno requerida

## Despliegue rápido (Vercel)
1. Crea un proyecto en [Vercel](https://vercel.com), instala CLI `npm i -g vercel`.
2. Duplica `.env.example` a `.env` y coloca tu **GEMINI_API_KEY** de Google AI Studio.
3. `vercel dev` para correr local y probar en `http://localhost:3000`.
4. `vercel` y luego `vercel --prod` para producción.

## Desarrollo local (sin Vercel)
Puedes servir `index.html` con cualquier server estático, pero el endpoint `/api/chat` debe existir.
La ruta incluida (`/api/chat`) está lista para Vercel. Si quieres Express:
- Instala express y @google/generative-ai y crea un server.js que sirva `index.html` y el POST `/api/chat`.

## Notas
- El video del avatar se carga desde `https://nextnowmedia.com/avatarh.mp4`. Asegúrate de permitirlo en CSP si cambias tu hosting.
- Si el endpoint falla o no hay API key, el chat usa **fallback** por palabras clave (Wi‑Fi, check-in, etc.).
- Edita los datos del hotel en `index.html` dentro de `HOTEL_CONTEXT`.
