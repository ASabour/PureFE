/**
 * AboutVM — minimal example page.
 *
 *   Use this as a copy-paste template for any simple "static" page: a
 *   title, a description, a few facts, a CTA. No router params, no
 *   network calls — just observables consumed by the template.
 */

import env from '../../../app/config/env.js';

class AboutVM {
  constructor() {
    this.appName = env.appName;
    this.tagline =
      'A pure-frontend MVVM scaffold built on Knockout.js + Vite. ' +
      'Strict separation of HTML, CSS and JavaScript — no React, no JSX, no compromise.';

    this.facts = [
      { label: 'Stack',     value: '<strong>Knockout.js</strong> · <strong>Vite</strong> · <strong>Bootstrap</strong> · <strong>Vitest</strong>' },
      { label: 'License',   value: 'MIT' },
      { label: 'Routing',   value: 'Hash-based SPA · custom <code>routeLink</code> binding · no full reloads' },
      { label: 'Theming',   value: 'CSS custom properties · light + dark · stored in <code>localStorage</code>' },
      { label: 'Testing',   value: 'Vitest, configured in <code>vite.config.js</code>' },
      { label: 'Build',     value: 'Vite — tree-shaking, code splitting, content-hashed filenames' },
    ];
  }
}

export default AboutVM;