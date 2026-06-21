/**
 * site-header — global top navigation component.
 *
 *   Three-file separation pattern (the convention used throughout PureFE):
 *     site-header.html   — markup only  (no JS, no inline styles)
 *     site-header.css    — styles only  (consumed automatically when this file loads)
 *     site-header.js     — logic only   (this file)
 *
 *   Knockout custom element:  <site-header></site-header>
 *
 *   To add a menu item: push into `this.menu` below. Its `path` must match
 *   a route registered in src/app/config/navigation.js.
 */

import ko from 'knockout';
import env from '../../../app/config/env.js';
import template from './site-header.html?raw';
import './site-header.css';

class SiteHeaderVM {
  constructor() {
    this.appName = env.appName;

    // Single source of truth for the top nav. Edit here, not in HTML.
    this.menu = [
      { path: '/',             label: 'Home' },
      { path: '/tutorial',     label: 'Tutorial' },
      { path: '/architecture', label: 'Architecture' },
      { path: '/about',        label: 'About' },
    ];
  }
}

ko.components.register('site-header', {
  template,
  viewModel: { createViewModel: () => new SiteHeaderVM() },
});