/**
 * home.js — view-model for the Home page.
 * Pure JS class: no DOM access, no inline HTML.
 * Knockout observables drive the template reactively.
 */
import ko from 'knockout';
import notify from '../../../ui/services/notificationService.js';

class HomeVM {
  constructor() {
    // ── Workflow steps shown on the page ──────────────────────────────
    this.steps = [
      {
        title: 'Install PureFE',
        body:
          'Run `npm create purefe@latest my-app` (or `npx degit user/PureFE/template my-app`) ' +
          'and `npm install`. A working SPA with 4 pages and 21 tests is ready in seconds.',
      },
      {
        title: 'Copy a feature folder',
        body:
          'Duplicate `src/features/home/` and rename it. ' +
          'A feature is one folder with `views/`, `viewModels/`, ' +
          '`styles/`, and an `index.js` that registers components.',
      },
      {
        title: 'Build the page (3 files)',
        body:
          'Write the markup in a `.html` file, the styles in a ' +
          '`.css` file, and the logic in a `.js` view-model. ' +
          'No inline scripts, no inline styles.',
      },
      {
        title: 'Register a route',
        body:
          'Export `<feature>Routes` from the feature\'s `index.js`, ' +
          'then spread it inside `src/app/config/navigation.js`.',
      },
      {
        title: 'Wire the navigation',
        body:
          'Add the new path to the `menu` array inside ' +
          '`src/ui/components/site-header/site-header.js` so it appears in the header.',
      },
      {
        title: 'Run, test, ship',
        body:
          '`npm run dev` for hot-reload development, `npm test` ' +
          'for the Vitest suite, `npm run build` to produce the production bundle in `dist/`.',
      },
    ];

    // ── The three pillars highlighted on the home page ────────────────
    this.pillars = [
      {
        icon:  '◧',
        title: 'HTML — markup only',
        body:
          'Templates contain only structure and Knockout bindings. No inline ' +
          'JavaScript expressions, no inline styles, no business logic.',
      },
      {
        icon:  '◨',
        title: 'CSS — styles only',
        body:
          'Each page / component owns a sibling .css file. All colors, ' +
          'spacing and radii come from tokens.css, so theming is one-place.',
      },
      {
        icon:  '◩',
        title: 'JS — logic only',
        body:
          'View-models are plain classes with observables and methods. They ' +
          'never query the DOM directly — Knockout does that for you.',
      },
    ];
  }

  /** Demo handler for the four notification-test buttons.
   *  Called from home.html via:  data-bind="click: notify.bind($data, 'success')"
   */
  showNotify(type) {
    const messages = {
      success: 'Looks great — toast service is wired.',
      info:    'Notifications are a singleton — call from any view-model.',
      warning: 'Warnings stick for 3.5 s.',
      error:   'Errors stick for 5 s — give the user time to read.',
    };
    notify[type](messages[type]);
  }
}

export default HomeVM;
