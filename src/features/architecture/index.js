/**
 * Architecture feature — registers the `architecture-page` component.
 */

import ko from 'knockout';

import architectureHtml from './views/architecture.html?raw';
import ArchitectureVM   from './viewModels/architecture.js';
import './styles/architecture.css';

ko.components.register('architecture-page', {
  template: architectureHtml,
  viewModel: { createViewModel: (params) => new ArchitectureVM(params) },
});

export const architectureRoutes = [
  { path: '/architecture', component: 'architecture-page' },
];