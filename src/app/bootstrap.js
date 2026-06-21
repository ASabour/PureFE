/**
 * bootstrap.js — Application entry point.
 */

// ── 1. Styles ────────────────────────────────────────────────────────────────
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ui/styles/tokens.css';
import '../ui/styles/base.css';

// ── 2. Library ───────────────────────────────────────────────────────────────
import ko from 'knockout';

// ── 3. App services ──────────────────────────────────────────────────────────
import env    from './config/env.js';
import router from './router.js';
import routes from './config/navigation.js';

// ── 4. Theme service ─────────────────────────────────────────────────────────
import '../core/theme/themeService.js';

// ── 5. Global UI components ───────────────────────────────────────────────────
import '../ui/components/spinner/spinner.js';
import '../ui/services/notificationService.js';
import '../ui/components/notification/notification.js';
import '../ui/components/theme-toggle/theme-toggle.js';
import '../ui/components/site-header/site-header.js';
import '../ui/components/site-footer/site-footer.js';

// ── 6. Fallback components ────────────────────────────────────────────────────
ko.components.register('not-found', {
  template:
    '<div class="not-found text-center py-5">' +
      '<h1 class="display-1 fw-bold">404</h1>' +
      '<p class="lead">That page does not exist.</p>' +
      '<a data-bind="routeLink: \'/\'">&larr; Back to home</a>' +
    '</div>',
  viewModel: function () {},
});
ko.components.register('blank', {
  template: '<span></span>',
  viewModel: function () {},
});

// ── 7. Root view-model ────────────────────────────────────────────────────────
class AppViewModel {
  constructor() {
    this.appName       = env.appName;
    this.currentPage   = router.currentComponent;
    this.currentParams = router.currentParams;
  }
}

// ── 8. Boot ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  router.register(routes);
  ko.applyBindings(new AppViewModel(), document.documentElement); // ← FIXED
  router.init();
});
