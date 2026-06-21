/**
 * Tutorial feature — registers the `tutorial-page` component and its route.
 */

import ko from 'knockout';

import tutorialHtml from './views/tutorial.html?raw';
import TutorialVM   from './viewModels/tutorial.js';
import './styles/tutorial.css';

ko.components.register('tutorial-page', {
  template: tutorialHtml,
  viewModel: { createViewModel: (params) => new TutorialVM(params) },
});

export const tutorialRoutes = [
  { path: '/tutorial', component: 'tutorial-page' },
];