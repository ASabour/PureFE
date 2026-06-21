/**
 * About feature — registers the `about-page` component.
 */

import ko from 'knockout';

import aboutHtml from './views/about.html?raw';
import AboutVM   from './viewModels/about.js';
import './styles/about.css';

ko.components.register('about-page', {
  template: aboutHtml,
  viewModel: { createViewModel: (params) => new AboutVM(params) },
});

export const aboutRoutes = [
  { path: '/about', component: 'about-page' },
];