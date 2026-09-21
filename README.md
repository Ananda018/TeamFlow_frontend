# TeamFlow frontend

React 19 + Vite application with a responsive shell, client-side routing, service status page, retry/loading states, and a rendering error boundary.

## Setup

Node.js >=22.12 is required.

```powershell
npm ci
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm run dev
```

Open http://localhost:5173. Start the [backend](https://github.com/Ananda018/TeamFlow_backend) separately with its MongoDB and Redis services.

The default API base is `/api`. Vite proxies it to `http://127.0.0.1:8000`. To use a different backend port, change `API_PROXY_TARGET` in `.env`. `VITE_API_BASE_URL` can select an explicit API base URL; all `VITE_` values are public browser configuration and must not contain secrets.

Routes:

- `/`: welcome page.
- `/status`: live API/database/cache connection status.
- Unknown routes: a not-found page with a home link.

## Verification

```powershell
npm run lint
npm test
npm run build
npm run format:check
```

Tests use Vitest, jsdom, and Testing Library, with mocked HTTP requests. They cover loading, success, unavailable services, retry, cancellation, navigation, and rendering errors. Build output goes to `dist/`.

`npm run preview` serves the compiled app for inspection. The dev proxy is not a production deployment strategy: deploy a same-origin `/api` reverse proxy or set `VITE_API_BASE_URL` at build time. Production hosting also needs an SPA fallback for routes such as `/status`.

Authentication and business screens are deferred to later phases. Existing Redux/auth utilities are preserved.
