/**
 * site-footer — global footer component.
 *
 *   Three-file separation:  site-footer.html / .css / .js
 *
 *   Knockout custom element:  <site-footer></site-footer>
 *
 *   Edit the `columns` array below to change the displayed link groups.
 *   Edit `tagline` / `copyright` to suit your project.
 *
 *   Convention:
 *     - Internal links use { external: false, href: '/path' } — uses routeLink
 *     - External links use { external: true,  href: 'https://...' }
 */

import ko from 'knockout';
import env from '../../../app/config/env.js';
import template from './site-footer.html?raw';
import './site-footer.css';

class SiteFooterVM {
  constructor() {
    this.appName = env.appName;
    this.tagline = 'A pure-frontend MVVM scaffold built on Knockout.js + Vite.';
    this.copyright = `© ${new Date().getFullYear()} ${env.appName}. All rights reserved.`;

    this.columns = [
      {
        heading: 'Get Started',
        links: [
          { label: 'Home',         href: '/',             external: false },
          { label: 'Tutorial',     href: '/tutorial',     external: false },
          { label: 'Architecture', href: '/architecture', external: false },
        ],
      },
      {
        heading: 'Project',
        links: [
          { label: 'About',        href: '/about',        external: false },
          { label: 'Source code',  href: 'https://github.com/YOUR_USERNAME/PureFE', external: true },
        ],
      },
      {
        heading: 'Stack',
        links: [
          { label: 'Knockout.js',  href: 'https://knockoutjs.com',          external: true },
          { label: 'Vite',         href: 'https://vitejs.dev',              external: true },
          { label: 'Bootstrap',    href: 'https://getbootstrap.com',        external: true },
        ],
      },
    ];
  }
}

ko.components.register('site-footer', {
  template,
  viewModel: { createViewModel: () => new SiteFooterVM() },
});