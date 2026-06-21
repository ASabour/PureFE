/**
 * theme-toggle — light / dark switch.
 *
 *   Three-file separation:  theme-toggle.html / .css / .js
 *
 *   Custom element:  <theme-toggle></theme-toggle>
 *
 *   The button shows the icon + short label of the theme it will switch TO,
 *   not the current one — that's the convention users expect.
 */

import ko from 'knockout';
import theme from '../../../core/theme/themeService.js';
import template from './theme-toggle.html?raw';
import './theme-toggle.css';

class ThemeToggleVM {
  constructor() {
    // The icon/label show the *target* theme, not the current.
    this.icon       = ko.computed(() => (theme.mode() === 'dark' ? '☀' : '☾'));
    this.shortLabel = ko.computed(() => (theme.mode() === 'dark' ? 'Light' : 'Dark'));
    this.label      = ko.computed(() => `Switch to ${this.shortLabel()} mode`);
  }

  toggle() { theme.toggle(); }
}

ko.components.register('theme-toggle', {
  template,
  viewModel: { createViewModel: () => new ThemeToggleVM() },
});