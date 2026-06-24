# English With Henda — Frontend

React + Vite + TypeScript SPA for the **English With Henda** platform — English workbooks for Tunisian students (grades 4–9).

---

## Project Structure

```
english-with-hinda/
├── src/
│   ├── pages/          # Route-level components
│   │   ├── Index.tsx         Home page
│   │   ├── BooksIndex.tsx    Book catalogue
│   │   ├── GradeHub.tsx      Grade-specific listing
│   │   ├── BookDetail.tsx    Single book page
│   │   ├── ResourcesIndex.tsx Audio resources listing
│   │   ├── ResourceDetail.tsx Single resource + audio player
│   │   ├── Admin.tsx         Protected admin dashboard
│   │   ├── Login.tsx         Admin login
│   │   ├── About.tsx         About page
│   │   ├── Contact.tsx       Contact form
│   │   └── Legal.tsx         Privacy / Terms / Cookies
│   ├── components/
│   │   ├── layout/     Header, Footer, Layout, WhatsAppCTA
│   │   └── ui/         shadcn/ui component library
│   ├── contexts/
│   │   ├── AuthContext.tsx    Admin JWT auth state
│   │   └── LanguageContext.tsx ar/en language toggle
│   ├── data/
│   │   └── books.ts    Book metadata (cover URLs → server)
│   ├── lib/
│   │   ├── api.ts      API client + mediaUrl() helper
│   │   ├── types.ts    TypeScript types
│   │   └── useLocalized.ts Bilingual localization helper
│   └── i18n/           Arabic & English translations
├── public/             Logo + PWA icons (stay bundled)
├── vite.config.ts      Dev proxy: /api & /media → port 4000
└── ecosystem.config.cjs PM2 config (front + server entries)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 (SWC) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Routing | React Router 6 |
| State | React Query 5 |
| Forms | React Hook Form + Zod |
| i18n | i18next (Arabic RTL default / English LTR) |
| Animations | Framer Motion |

---

## Getting Started

### Prerequisites
- Node.js ≥ 20
- The **API server** running on port 4000 (see `../server/README.md`)

### Install & run

```bash
npm install
npm run dev          # http://localhost:8000
```

The Vite dev server automatically proxies `/api` and `/media` requests to `http://localhost:4000`.

### Build

```bash
npm run build        # Output: dist/
npm run preview      # Preview production build
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | *(empty)* | Base URL of the API server. Leave empty when Nginx proxies `/api` and `/media` on the same domain. Set to a full URL (e.g. `https://api.example.com`) if the server is on a different domain. |

Create `.env` in this directory (already in `.gitignore`):
```env
VITE_API_URL=
```

---

## Admin Panel

Navigate to `/login` and sign in with the admin credentials configured in the server's `.env`.

Once logged in:
- An **Admin** link appears in the navigation bar
- `/admin` is a protected dashboard for full resource CRUD
- The JWT token is stored in `localStorage` and persists across page reloads
- Logout clears the token

---

## Media

All media (book covers, profile photos, WhatsApp icons, audio) is served by the Express server at `/media/*`. The `mediaUrl()` helper in `src/lib/api.ts` builds the correct absolute URL based on `VITE_API_URL`.

Only the site logo (`/new-logo.png`) and PWA icons remain in `public/` and are bundled with the frontend.

---

## Internationalization

The app defaults to **Arabic (RTL)**. Users toggle to English via the button in the header. The chosen language persists in `localStorage`.

Translation files: `src/i18n/locales/ar.ts` and `src/i18n/locales/en.ts`.

---

## Deployment

Deployment is handled automatically by GitHub Actions on push to the `production` branch.

The workflow (`.github/workflows/deploy.yml`) SSHs into the VPS, runs `deploy.sh` which:
1. Pulls the latest code
2. Runs `npm ci && npm run build`
3. Restarts the PM2 `front` process (static file server on port 8000)

### GitHub secrets & variables required

| Name | Type | Value |
|------|------|-------|
| `SSH_HOST` | Secret | VPS IP or hostname |
| `SSH_USERNAME` | Secret | SSH user |
| `SSH_PRIVATE_KEY` | Secret | Private key for SSH |
| `DEPLOY_PATH` | Variable | `/var/www/learnenglish/front` |
| `BUILD_DIR` | Variable | `dist` |
| `NVM_DIR` | Variable | e.g. `/home/user/.nvm` |
| `PM2_APP` | Variable | `front` |

### Nginx (recommended)

Configure Nginx to:
- Serve the frontend (port 8000) at the root domain
- Proxy `/api` and `/media` to the API server (port 4000)

```nginx
server {
    listen 80;
    server_name englishwithhenda.com;

    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
    }

    location /media/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
    }
}
```

---

## Routes

| Path | Page | Auth required |
|------|------|:---:|
| `/` | Home | — |
| `/books` | Book catalogue | — |
| `/books/:gradeSlug` | Grade hub | — |
| `/book/:slug` | Book detail | — |
| `/resources` | Audio resources | — |
| `/resources/:slug` | Resource detail + player | — |
| `/about` | About | — |
| `/contact` | Contact | — |
| `/login` | Admin login | — |
| `/admin` | Admin dashboard | ✓ |
| `/privacy` | Privacy policy | — |
| `/terms` | Terms of service | — |
| `/cookies` | Cookie policy | — |
