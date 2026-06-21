/**
 * ArchitectureVM — guided tour of the project structure.
 *
 *   The folder list mirrors the on-disk structure. If you reorganize the
 *   codebase, update this file AND ARCHITECTURE.md so the in-app and
 *   on-disk docs stay in sync.
 */

class ArchitectureVM {
    constructor() {
      this.tree =
  `<project>/
  ├── index.html              # static shell, mounts <site-header>, <main>, <site-footer>
  ├── package.json            # scripts (dev / build / preview / test)
  ├── vite.config.js          # build + Vitest config (rarely changed)
  ├── ARCHITECTURE.md         # this same map, on disk
  ├── AI_PROMPT.md            # paste into any AI to teach it the rules
  └── src/
      ├── app/                # application boot + cross-cutting wiring
      │   ├── bootstrap.js    # entry point (the only file with side-effect imports)
      │   ├── router.js       # hash router + routeLink binding
      │   └── config/
      │       ├── env.js          # env-specific constants (URLs, keys, flags)
      │       └── navigation.js   # the route table
      │
      ├── core/               # framework-agnostic, reusable utilities
      │   ├── auth/token.js       # auth token storage + headers
      │   ├── http/ServerCaller.js # fetch wrapper
      │   ├── theme/themeService.js # light / dark mode
      │   ├── utils/              # textUtilities, jsonUtilities, ...
      │   └── validation/         # form-validation primitives
      │
      ├── ui/                 # shared UI atoms — used by many features
      │   ├── components/
      │   │   ├── site-header/    # 3 files: .html / .css / .js
      │   │   ├── site-footer/
      │   │   ├── theme-toggle/
      │   │   ├── notification/
      │   │   └── spinner/
      │   ├── services/
      │   │   └── notificationService.js   # singleton toast service
      │   └── styles/
      │       ├── tokens.css      # design tokens (light + dark)
      │       └── base.css        # global resets + Bootstrap overrides
      │
      └── features/           # one folder per page or domain area
          ├── home/               # 3 files per page (html / css / js)
          ├── tutorial/
          ├── architecture/
          └── about/
  `;
  
      this.folders = [
        {
          path: 'src/app/',
          tag: 'boot + wiring',
          purpose:
            'Wires up the application: imports CSS, registers components, ' +
            'starts the router. Everything that runs at startup goes here.',
          example:
            'Add a new global side-effect import? Do it in <code>bootstrap.js</code>. ' +
            'Add a new route? Edit <code>config/navigation.js</code>.',
        },
        {
          path: 'src/core/',
          tag: 'framework-agnostic',
          purpose:
            'Reusable utilities that have NO knowledge of Knockout or the DOM. ' +
            'You should be able to copy any file from here into another project ' +
            'and have it work.',
          example:
            '<code>core/http/ServerCaller.js</code> is a fetch wrapper — pure JS, no observables. ' +
            'A new <code>core/cache/sessionCache.js</code> would belong here too.',
        },
        {
          path: 'src/ui/',
          tag: 'shared UI atoms',
          purpose:
            'Components and services used by more than one feature: header, ' +
            'footer, spinner, toast notifications, theme switcher. Each component ' +
            'is its own folder with the three-file pattern.',
          example:
            'A reusable <code>&lt;app-modal&gt;</code> would go in ' +
            '<code>ui/components/modal/</code>. A new toast type would extend ' +
            '<code>ui/services/notificationService.js</code>.',
        },
        {
          path: 'src/features/',
          tag: 'pages + domains',
          purpose:
            'One folder per feature (or domain area). Each contains ' +
            '<code>views/</code>, <code>styles/</code>, <code>viewModels/</code> and an ' +
            '<code>index.js</code> that registers components + exports routes.',
          example:
            'Add a "users" admin section? Create <code>features/users/</code> with ' +
            '<code>views/usersList.html</code>, <code>views/userDetail.html</code>, ' +
            'and matching <code>.css</code> / <code>.js</code> siblings.',
        },
        {
          path: 'tests/',
          tag: 'unit tests',
          purpose:
            'Vitest tests for everything in <code>core/</code> and feature view-models. ' +
            'Mirror the source structure (<code>tests/core/...</code>, <code>tests/features/...</code>).',
          example:
            '<code>tests/core/textUtilities.test.js</code> tests ' +
            '<code>src/core/utils/textUtilities.js</code>.',
        },
      ];
  
      this.rules = [
        { ok: true,  text: 'HTML, CSS, and JS for a page live in <em>three</em> sibling files.' },
        { ok: true,  text: 'View-models are plain classes — no DOM access.' },
        { ok: true,  text: 'All colors and spacing come from <code>tokens.css</code>.' },
        { ok: true,  text: 'Internal links use the <code>routeLink</code> binding.' },
        { ok: false, text: 'Inline JavaScript inside HTML attributes (e.g. <code>onclick</code>).' },
        { ok: false, text: 'Inline <code>style="..."</code> attributes — put the rule in CSS instead.' },
        { ok: false, text: 'Importing a feature from another feature — go through <code>core/</code> or <code>ui/</code>.' },
        { ok: false, text: 'Hard-coded URLs scattered across files — they belong in <code>app/config/env.js</code>.' },
      ];
    }
  }
  
  export default ArchitectureVM;