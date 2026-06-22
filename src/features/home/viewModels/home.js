/**
 * home.js — view-model for the Home page.
 * Pure JS class: no DOM access, no inline HTML.
 */
import ko from 'knockout';
import notify from '../../../ui/services/notificationService.js';

class HomeVM {
  constructor() {

    this.steps = [
      {
        title: 'Install PureFE',
        body:
          'Run <code>npx degit YOUR_USERNAME/PureFE/template my-app</code> ' +
          'and <code>npm install</code>. A working SPA with 4 pages is ready in seconds.',
      },
      {
        title: 'Copy a feature folder',
        body:
          'Duplicate <code>src/features/home/</code> and rename it. ' +
          'A feature is one folder with <code>views/</code>, <code>viewModels/</code>, ' +
          '<code>styles/</code>, and an <code>index.js</code> that registers components.',
      },
      {
        title: 'Build the page (3 files)',
        body:
          'Write the markup in a <code>.html</code> file, the styles in a ' +
          '<code>.css</code> file, and the logic in a <code>.js</code> view-model. ' +
          'No inline scripts, no inline styles.',
      },
      {
        title: 'Register a route',
        body:
          'Export <code>&lt;feature&gt;Routes</code> from the features <code>index.js</code>, ' +
          'then spread it inside <code>src/app/config/navigation.js</code>.',
      },
      {
        title: 'Wire the navigation',
        body:
          'Add the new path to the <code>menu</code> array inside ' +
          '<code>src/ui/components/site-header/site-header.js</code> so it appears in the header.',
      },
      {
        title: 'Run, test, ship',
        body:
          '<code>npm run dev</code> for hot-reload development, <code>npm test</code> ' +
          'for the Vitest suite, <code>npm run build</code> to produce the production bundle.',
      },
    ];

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
          'Each page/component owns a sibling .css file. All colors, ' +
          'spacing, and radii come from tokens.css — theming is one-place.',
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

  /**
   * Demo handler for the four notification-test buttons.
   * Called from home.html:  data-bind="click: function(){ $data.showNotify('success') }"
   *
   * Named showNotify (NOT notify) to avoid shadowing the imported notify object.
   */
  showNotify(type) {
    const messages = {
      success: 'Looks great — toast service is wired.',
      info:    'Notifications are a singleton — call from any view-model.',
      warning: 'Warnings stick for 3.5 s.',
      error:   'Errors stick for 5 s — give the user time to read.',
    };
    const message = messages[type];
    if (!message) return;                  // guard against typos in the type string

    if      (type === 'success') notify.success(message);
    else if (type === 'info')    notify.info(message);
    else if (type === 'warning') notify.warning(message);
    else if (type === 'error')   notify.error(message);
  }
}

export default HomeVM;
