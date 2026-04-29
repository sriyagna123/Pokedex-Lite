# Pokedex Lite

A responsive Pokemon browser built with React + TypeScript + Vite and powered by [PokeAPI](https://pokeapi.co/).

## Features

- Paginated Pokemon fetching with `limit` + `offset`
- Responsive card grid with Pokemon name, artwork, and type badges
- Real-time search by Pokemon name
- Type filter (Fire, Water, Grass, etc.)
- Previous/Next pagination controls
- Favorite toggle persisted with `localStorage`
- Pokemon details modal with stats, abilities, and types
- Loading and error state handling for page and modal requests

## Tech Stack

- React 19
- TypeScript
- Vite
- Native Fetch API

## Project Structure

- `src/api` - API layer and PokéAPI helpers
- `src/components` - Reusable UI components
- `src/types` - Shared TypeScript interfaces
- `src/App.tsx` - Main screen state + app orchestration

## Local Setup

```bash
npm install
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo into [Vercel](https://vercel.com/).
3. Keep defaults (`Build Command: npm run build`, `Output: dist`).
4. Deploy.

## Implementation Notes

- Data fetching is separated in `src/api/pokeApi.ts`.
- Component logic is split into `PokemonCard` and `PokemonModal` to keep `App` focused on state management.
- Favorites are persisted with a single `localStorage` key: `pokedex-lite-favorites`.
