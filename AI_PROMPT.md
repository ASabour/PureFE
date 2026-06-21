# AI_PROMPT.md — PureFE Codebase Rules
# Paste this entire file into any AI before asking it to write code for this project.

You are helping build a project using **PureFE**, a lightweight SPA framework.
Read and follow every rule below without exception.

---

## Stack

| Layer | Technology |
|---|---|
| UI bindings | Knockout.js (`ko`) — observables, `data-bind`, components |
| Build tool | Vite 5 — ES modules, HMR, path aliases |
| Tests | Vitest + jsdom |
| CSS baseline | Bootstrap 5 (utility classes only) + custom `tokens.css` |
| Routing | Hash router (`/#/path`) — custom, lives in `src/app/router.js` |

---

## Absolute Rules — Never Break These

1. **Three files per page.** Every page or component is exactly:
   - `*.html` — markup + `data-bind` attributes only
   - `*.css`  — styles only, using tokens from `tokens.css`
   - `*.js`   — view-model class only

2. **No inline JS in HTML.** No `onclick="..."`, no `<script>` blocks inside templates.
   Use Knockout `data-bind` exclusively.

3. **No `style="..."` attributes.** All styling lives in `.css` files.
   Colors, spacing, and radii must come from CSS custom properties in `tokens.css`.

4. **No DOM access in view-models.** Never use `document.querySelector`, `getElementById`,
   or any DOM API inside a view-model. Knockout does all DOM work for you.

5. **Internal links use `routeLink`.** Never use `<a href="/path">` for in-app navigation.
   Always use `<a data-bind="routeLink: '/path'">`.

6. **One route table.** All routes live in `src/app/config/navigation.js` only.
   Features export a `*Routes` array; `navigation.js` spreads them together.

7. **One env file.** API URLs, app name, and feature flags live in `src/app/config/env.js`.
   Never hard-code a URL anywhere else.

8. **Features never import each other.** If two features share code, it belongs in
   `src/core/` (no DOM/KO) or `src/ui/` (shared components/services).

---

## Folder Structure

```
src/
├── app/
│   ├── bootstrap.js          ← entry point, side-effect imports only
│   ├── router.js             ← hash router + routeLink binding
│   └── config/
│       ├── env.js            ← backendServer, appName, feature flags
│       └── navigation.js     ← single route table
├── core/                     ← pure JS, no Knockout, no DOM
│   ├── auth/token.js
│   ├── http/ServerCaller.js
│   ├── theme/themeService.js
│   ├── utils/textUtilities.js
│   ├── utils/jsonUtilities.js
│   └── validation/validation.js
├── ui/                       ← shared components used by multiple features
│   ├── components/
│   │   ├── site-header/      ← site-header.html / .css / .js
│   │   ├── site-footer/      ← site-footer.html / .css / .js
│   │   ├── theme-toggle/     ← theme-toggle.html / .css / .js
│   │   ├── notification/     ← notification.html / .css / .js
│   │   └── spinner/          ← spinner.html / .css / .js
│   ├── services/
│   │   └── notificationService.js
│   └── styles/
│       ├── tokens.css        ← CSS custom properties (light + dark)
│       └── base.css          ← global resets + Bootstrap overrides
└── features/                 ← one folder per page / domain
    └── <name>/
        ├── index.js          ← registers KO components, exports *Routes
        ├── views/*.html
        ├── styles/*.css
        └── viewModels/*.js
```

---

## How to Add a New Page (Step by Step)

```bash
# 1. Create the feature folder
mkdir -p src/features/products/views
mkdir -p src/features/products/styles
mkdir -p src/features/products/viewModels
```

```js
// 2. src/features/products/viewModels/products.js
import ko from 'knockout';
class ProductsVM {
  constructor() {
    this.title = ko.observable('Products');
  }
}
export default ProductsVM;
```

```html
<!-- 3. src/features/products/views/products.html -->
<section class="products">
  <h1 class="products__title" data-bind="text: title"></h1>
</section>
```

```css
/* 4. src/features/products/styles/products.css */
.products { max-width: 720px; margin: 0 auto; padding: var(--space-xl); }
.products__title { font-size: 1.75rem; color: var(--color-text); }
```

```js
// 5. src/features/products/index.js
import ko from 'knockout';
import productsHtml from './views/products.html?raw';
import ProductsVM   from './viewModels/products.js';
import './styles/products.css';

ko.components.register('products-page', {
  template:  productsHtml,
  viewModel: { createViewModel: (params) => new ProductsVM(params) },
});

export const productsRoutes = [
  { path: '/products', component: 'products-page' },
];
```

```js
// 6. src/app/config/navigation.js — add one import + one spread
import { productsRoutes } from '../../features/products/index.js';
const routes = [ ...homeRoutes, ...tutorialRoutes, ...productsRoutes ];
export default routes;
```

```js
// 7. src/ui/components/site-header/site-header.js — add menu entry
this.menu = [
  { path: '/',         label: 'Home' },
  { path: '/tutorial', label: 'Tutorial' },
  { path: '/products', label: 'Products' },  // ← new
];
```

---

## Notification Service

```js
// Import in any view-model:
import notify from '../../../ui/services/notificationService.js';

notify.success('Saved!');           // green, 3.5 s
notify.error('Something failed.');  // red, 5 s
notify.warning('Check this.');      // amber, 3.5 s
notify.info('FYI.');                // blue, 3.5 s
```

---

## ServerCaller (HTTP)

```js
import { callServer } from '@core/http/ServerCaller.js';

// GET
const users = await callServer('/users');

// POST
const created = await callServer('/users', 'POST', { name: 'Adel' });

// PUT
await callServer('/users/1', 'PUT', { name: 'Adel S.' });

// DELETE
await callServer('/users/1', 'DELETE');
```

---

## Token / Auth

```js
import { tokenService } from '@core/auth/token.js';

tokenService.set(jwtString);      // save after login
tokenService.get();               // read in view-models
tokenService.clear();             // logout
tokenService.authHeader();        // { Authorization: 'Bearer ...' }
```

---

## Validation

```js
import { validators, validate } from '@core/validation/validation.js';

const error = validate(this.email(), [validators.required, validators.email]);
// error === null means valid; otherwise error is a string message.
```

---

## Vite Path Aliases

| Alias | Resolves to |
|---|---|
| `@app` | `src/app/` |
| `@core` | `src/core/` |
| `@ui` | `src/ui/` |
| `@features` | `src/features/` |

---

## What NOT to Do (will break the framework)

```js
// ✗ DOM access in a view-model
document.getElementById('myEl').style.display = 'none';

// ✗ Inline JS in HTML
<button onclick="doSomething()">Click</button>

// ✗ Plain href for internal navigation (causes full page reload)
<a href="/products">Products</a>

// ✗ Hard-coded API URL
fetch('http://localhost:8000/api/users')

// ✗ Feature importing another feature
import { something } from '../other-feature/index.js';

// ✗ Route registered outside navigation.js
router.routes.push({ path: '/hack', component: 'hack-page' });

// ✗ AMD template loading — Vite has no AMD loader
ko.components.register('my-comp', {
  template: { require: './my-comp.html' },   // ← NEVER do this
});

// ✓ Correct — always import as raw string
import template from './my-comp.html?raw';
ko.components.register('my-comp', { template, viewModel: MyVM });
```
