# PureFE

> A minimal SPA framework template — Knockout.js + Vite, MVVM, strict HTML/CSS/JS separation, true hash routing, light + dark mode.

## Philosophy

Three files per page. No inline JS. No inline styles. No DOM access in view-models.  
Every page is exactly `*.html` (markup) + `*.css` (styles) + `*.js` (logic).

## Quick Start

```bash
# Scaffold a new project from this template
npx degit YOUR_GITHUB_USERNAME/PureFE/template my-new-project
cd my-new-project
npm install
npm run dev
```

## Lifecycle Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR → http://localhost:5173 |
| `npm run build` | Production build → `./dist` |
| `npm run preview` | Serve production build → http://localhost:4173 |
| `npm test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode |

> Free a stuck port: `lsof -ti:5173 | xargs kill -9`  
> On Windows: `npx kill-port 5173`

## What Ships Out of the Box

- 4 starter pages: Home, Tutorial, Architecture, About
- Site header with navigation + light/dark theme toggle
- Site footer
- True SPA navigation — no page reloads
- Toast notification singleton service
- Unit tests for core utilities

## Adding a New Page

```bash
cp -r src/features/about src/features/products
```

Then inside `src/features/products/`:
1. Rename `about.html / .css / .js` → `products.html / .css / .js`
2. Update component name in `index.js` → `'products-page'`
3. Update route path in `index.js` → `'/products'`
4. Rename the export → `productsRoutes`

Register in `src/app/config/navigation.js`:
```js
import { productsRoutes } from '../../features/products/index.js';
const routes = [ ...homeRoutes, ..., ...productsRoutes ];
```

Add to header menu in `src/ui/components/site-header/site-header.js`:
```js
{ path: '/products', label: 'Products' }
```

## House Rules

| ✓ Do | ✗ Don't |
|---|---|
| 3 files per page: `.html` / `.css` / `.js` | Build DOM strings in `.js` |
| View-models: plain classes, no DOM | `document.querySelector` in a view-model |
| Colors from `tokens.css` | Hard-coded `#fff` or `12px` in CSS |
| Internal links via `routeLink` binding | Plain `href="/path"` (full reload) |
| Import templates with `?raw` | `{ require: '...' }` (AMD — breaks Vite) |
| Routes only in `navigation.js` | `router.routes.push(...)` from a feature |
| Constants only in `env.js` | Hard-coded API URLs in services |

## Binding Tip

Use `$root.appName` and `$root.currentPage` when binding from inside  
a component template (site-header, etc.) to reach the root AppViewModel.

## License

MIT
