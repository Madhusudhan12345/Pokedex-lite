# Pokédex Lite

A retro pixel-art styled Pokédex web app built with **React + Vite**, fetching data from the [PokéAPI](https://pokeapi.co/).

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Build & Deploy

```bash
# Production build → dist/
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

### Deploy to Netlify
Drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

---

## Features

| Feature | Details |
|---|---|
| **Data Fetching** | Fetches all 151 Gen 1 Pokémon in batches of 20 with a progress bar |
| **Loading / Error** | Animated Pokéball spinner + progress %, error screen with retry |
| **Pokémon Grid** | Responsive card grid with sprite, number, name, type badges |
| **Search** | Real-time filter by name as you type |
| **Type Filter** | Dropdown for all 18 Pokémon types |
| **Pagination** | 20 per page, page number buttons, first/last shortcuts |
| **Favorites** | Star toggle on each card, persisted in `localStorage` |
| **Favorites Filter** | Show only favorited Pokémon with count badge |
| **Detail Modal** | Animated stat bars, abilities, height/weight, close via ✕ or Escape |
| **Responsive** | Works on mobile (320px+), tablet, and desktop |
| **Animations** | Card hover lift, sprite bounce, modal slide-in, stat bar fill |

---

## Project Structure

```
pokedex-lite/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── pokeball.svg          # Favicon
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Root component, state management
    ├── App.module.css
    ├── index.css              # Global styles + CSS variables
    ├── constants.js           # Types, colors, config
    ├── api.js                 # PokéAPI fetching + caching
    ├── hooks/
    │   ├── usePokemon.js      # Data fetching hook
    │   └── useFavorites.js    # Favorites with localStorage
    └── components/
        ├── Header.jsx / .css
        ├── PokeCard.jsx / .css
        ├── PokemonModal.jsx / .css
        ├── StatBar.jsx / .css
        ├── TypeBadge.jsx / .css
        ├── Pagination.jsx / .css
        ├── LoadingScreen.jsx / .css
        └── ErrorScreen.jsx / .css
```

---

## Tech Stack

| Technology | Why |
|---|---|
| **React 18** | Component model, hooks for clean state management |
| **Vite** | Fast HMR, instant dev server, optimized production builds |
| **CSS Modules** | Scoped styles, no class name conflicts, co-located with components |
| **PokéAPI** | Free, public, comprehensive Pokémon data |
| **Google Fonts** (Press Start 2P, VT323) | Retro pixel-art aesthetic matching the Pokémon game era |
| **localStorage** | Zero-backend favorite persistence |

---

## Architecture Decisions

- **Batch fetching with cache**: All 151 Pokémon fetched in batches of 20 on load, cached in a module-level object. Filtering/search/pagination run on the local dataset — no extra API calls.
- **CSS Modules**: Each component has a co-located `.module.css` file. No CSS-in-JS runtime cost, no global class conflicts.
- **Custom hooks**: `usePokemon` and `useFavorites` separate concerns cleanly from the UI layer.
- **useMemo for filtering**: The filtered list is memoized to avoid recomputing on unrelated re-renders.

---

## Challenges

| Challenge | Solution |
|---|---|
| 151 network requests | Batched `Promise.all` in groups of 20 with progress tracking |
| Sprite quality | Used `official-artwork` endpoint, fallback to default sprite |
| Type filtering across pages | Filter runs on full dataset before slicing for page |
| Modal scroll lock | `document.body.style.overflow = 'hidden'` on mount, cleaned up on unmount |
| Keyboard accessibility | Escape key closes modal via `keydown` listener |
