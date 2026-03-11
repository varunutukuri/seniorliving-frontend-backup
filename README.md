# NestCare Living — Frontend

React 19 + Vite + Tailwind CSS frontend for the NestCare senior living platform.

## Prerequisites

- **Node.js** ≥ 20.19 (or ≥ 22.12)
- Backend API running on `http://localhost:5000` (see [seniorliving-backend](https://github.com/varunutukuri/seniorliving-backend))

## Setup

```bash
# Install dependencies
npm install

# Create your environment file (optional)
cp .env.example .env

# Start the dev server
npm run dev
```

The app runs on **http://localhost:5173**.

API requests to `/api` are automatically proxied to `http://localhost:5000` via Vite config.

## Scripts

| Command            | Description                     |
|--------------------|---------------------------------|
| `npm run dev`      | Start dev server with HMR       |
| `npm run build`    | Build for production             |
| `npm run preview`  | Preview production build         |
| `npm run lint`     | Run ESLint                       |

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── auth/        # Login, Register, OTP
│   ├── common/      # Shared widgets
│   └── layout/      # MainLayout, Sidebar
├── context/         # AuthContext (global auth state)
├── data/            # Static data (services, providers)
├── pages/           # Route pages
│   └── static/      # About, Contact, How It Works
└── services/        # API client (axios)
```
