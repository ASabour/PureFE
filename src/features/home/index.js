/**
 * Feature manifest — every feature folder has one of these.
 *
 *   Two responsibilities:
 *     1. Register every Knockout component this feature provides.
 *     2. Export a `<feature>Routes` array consumed by app/config/navigation.js.
 *
 *   Naming conventions (please follow):
 *     - Component name = kebab-case, namespaced by feature:  'home-page', 'users-list'
 *     - Route paths    = lowercase, leading slash:           '/', '/users/:id'
 *     - Export name    = `<feature>Routes` (camelCase plural)
 *
 *   To add a second page to this feature:
 *     1. Add views/<page>.html, styles/<page>.css and viewModels/<page>.js
 *     2. import them here, register a new component, push a new route
 *     3. (No edit to navigation.js needed — it just spreads `homeRoutes`.)
 */

import ko from 'knockout';

import homeHtml from './views/home.html?raw';
import HomeVM   from './viewModels/home.js';
import './styles/home.css';

ko.components.register('home-page', {
  template: homeHtml,
  viewModel: { createViewModel: (params) => new HomeVM(params) },
});

export const homeRoutes = [
  { path: '/', component: 'home-page' },
];