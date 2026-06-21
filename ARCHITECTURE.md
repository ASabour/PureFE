# Architecture

A guided tour of the PureFE codebase. Keep this file in sync with the folder map if you reorganize.

## Folder Map

```
template/
├── index.html              # static shell — mounts header, main, footer
├── package.json
├── vite.config.js
├── .gitignore
├── AI_PROMPT.md
├── README.md
├── ARCHITECTURE.md         # this file
└── src/
    ├── app/
    │   ├── bootstrap.js        # entry point — all side-effect imports
    │   ├── router.js           # hash router + routeLink binding
    │   └── config/
    │       ├── env.js          # backendServer, appName, feature flags
    │       └── navigation.js   # single route table
    ├── core/                   # pure JS — no Knockout, no DOM
    │   ├── auth/token.js
    │   ├── http/ServerCaller.js
    │   ├── theme/themeService.js
    │   ├── utils/textUtilities.js
    │   ├── utils/jsonUtilities.js
    │   └── validation/validation.js
    ├── ui/                     # shared components + services
    │   ├── components/
    │   │   ├── site-header/    # .html / .css / .js
    │   │   ├── site-footer/
    │   │   ├── theme-toggle/
    │   │   ├── notification/
    │   │   └── spinner/
    │   ├── services/
    │   │   └── notificationService.js
    │   └── styles/
    │       ├── tokens.css
    │       └── base.css
    └── features/
        ├── home/
        │   ├── views/home.html
        │   ├── styles/home.css
        │   ├── viewModels/home.js
        │   └── index.js
        ├── tutorial/
        ├── architecture/
        └── about/

tests/
└── core/
    ├── textUtilities.test.js
    └── validation.test.js
```

## Binding Scope Rule

`ko.applyBindings(new AppViewModel(), document.documentElement)` binds from `<html>` down.  
Inside component templates, use `$root.appName` or `$root.currentPage` to reach AppViewModel properties.

## What Goes Where

| Folder | Rule |
|---|---|
| `src/app/` | Boot wiring only. Routes in `navigation.js`, constants in `env.js` |
| `src/core/` | Zero Knockout/DOM. Copy any file to another project — it just works |
| `src/ui/` | Shared components. Every component = 3 files. Import templates with `?raw` |
| `src/features/` | One folder per page. Features never import each other |
| `tests/` | Mirror `src/` structure. Test every `core/` utility |

## House Rules

| ✓ Do | ✗ Don't |
|---|---|
| Import component templates with `?raw` | `template: { require: '...' }` (AMD) |
| Use `$root.prop` inside component templates | Assume flat binding scope |
| All colors/spacing from `tokens.css` | Hard-code values in CSS |
| `routeLink` binding for in-app links | Plain `href` (causes full reload) |
