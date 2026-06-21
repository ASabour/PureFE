/**
 * router.js — Hash-based SPA router with a SPA-friendly link binding.
 *
 *   Why hash routing?
 *     - Works on any static host (S3, GitHub Pages, nginx) with no server rewrites.
 *     - Tiny (~80 lines including the link binding) so the whole router is auditable.
 *
 *   Public surface (only these are used elsewhere):
 *     router.register(routes)         — called once at startup
 *     router.navigate(path)           — programmatic navigation from a view-model
 *     router.currentComponent         — observable: KO component name to render
 *     router.currentParams            — observable: { paramName: value, ... }
 *     router.isActive(path)           — true when the given path matches the URL
 *
 *   How rendering works:
 *     index.html has  <div data-bind="component: { name: currentPage, params: currentParams }">
 *     When either observable changes, Knockout tears down the old page
 *     component and instantiates the new one. No manual DOM manipulation.
 *
 *   How links stay SPA (NO full page reload):
 *     Use the `routeLink` binding on any <a>:
 *         <a data-bind="routeLink: '/tutorial'">Tutorial</a>
 *     The binding sets href="#/tutorial" AND intercepts the click so the
 *     URL update happens through router.navigate(...). It also adds the
 *     class "is-active" when the current route matches, so you can style
 *     the active nav item.
 *
 *   When to outgrow this:
 *     - Need history mode (no #) → swap in Navigo (~5KB) and configure server rewrites.
 *     - Need route guards → add an `onBefore` hook inside _resolve().
 *     - Need lazy-loaded routes → use dynamic import() in the feature's index.js.
 */

import ko from 'knockout';

class Router {
  constructor() {
    this.currentComponent = ko.observable('blank');
    this.currentParams = ko.observable({});
    this.currentPath = ko.observable('/');
    this.routes = [];
  }

  /** Register the route table. Called once from bootstrap.js. */
  register(routes) {
    this.routes = routes;
  }

  /** Programmatic navigation. Equivalent to clicking a routeLink. */
  navigate(path) {
    if (!path.startsWith('/')) path = '/' + path;
    // Setting hash triggers `hashchange` which calls _resolve().
    window.location.hash = '#' + path;
  }

  /** True if `path` matches the current URL. Used by routeLink for active styling. */
  isActive(path) {
    return this.currentPath() === path;
  }

  /** Wire up the hashchange listener and resolve the initial URL. */
  init() {
    window.addEventListener('hashchange', () => this._resolve());
    this._resolve();
  }

  // ─── private ───────────────────────────────────────────────────────────
  _resolve() {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, '')) || '/';
    this.currentPath(hash);
    for (const route of this.routes) {
      const match = this._match(route.path, hash);
      if (match) {
        this.currentParams(match.params);
        this.currentComponent(route.component);
        // Scroll to top on route change — feels like a real navigation
        // without actually reloading the page.
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
    }
    this.currentComponent('not-found');
    this.currentParams({});
  }

  _match(pattern, path) {
    const paramNames = [];
    const regex = new RegExp(
      '^' +
        pattern.replace(/:([^/]+)/g, (_, n) => {
          paramNames.push(n);
          return '([^/]+)';
        }) +
        '$'
    );
    const m = path.match(regex);
    if (!m) return null;
    const params = {};
    paramNames.forEach((n, i) => (params[n] = m[i + 1]));
    return { params };
  }
}

// Export a singleton — every importer gets the same instance.
const router = new Router();
export default router;

/**
 * Custom Knockout binding: routeLink.
 *
 *   Usage:
 *     <a data-bind="routeLink: '/tutorial'">Tutorial</a>
 *     <a data-bind="routeLink: { path: '/users/' + id(), exact: true }">View</a>
 *
 *   What it does:
 *     1. Sets href="#/path"  → so middle-click / "open in new tab" still work,
 *        and the browser status bar shows the real URL on hover.
 *     2. On left-click (no modifier), prevents the default and calls
 *        router.navigate(path) instead. No full page reload, ever.
 *     3. Adds the class "is-active" when the link's path is the current route,
 *        so you can highlight the active nav item with one CSS rule.
 */
ko.bindingHandlers.routeLink = {
  init(element, valueAccessor) {
    element.addEventListener('click', (event) => {
      // Honor modifier keys / non-left-click (open in new tab, etc.).
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      const cfg = ko.unwrap(valueAccessor());
      const path = typeof cfg === 'string' ? cfg : cfg.path;
      router.navigate(path);
    });
  },
  update(element, valueAccessor) {
    const cfg = ko.unwrap(valueAccessor());
    const path = typeof cfg === 'string' ? cfg : cfg.path;
    element.setAttribute('href', '#' + path);

    // Active-state class for nav highlighting.
    const active = router.currentPath() === path;
    element.classList.toggle('is-active', active);
  },
};