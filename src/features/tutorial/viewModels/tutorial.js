/**
 * TutorialVM — "your first feature" walkthrough.
 *
 *   The 5 steps below show, end-to-end, how to add a new page named
 *   "products" to a PureFE project. Each step has prose + an optional
 *   code block — that's all the template renders.
 *
 *   Edit / shorten / lengthen at will. The structure (steps array) is
 *   the contract the template depends on.
 */

class TutorialVM {
    constructor() {
      this.steps = [
        {
          title: 'Create the feature folder',
          body:
            'Every page in PureFE lives inside a feature folder under ' +
            '<code>src/features/&lt;name&gt;/</code>. Start by creating the directory ' +
            'structure for a new feature called <code>products</code>:',
          code:
  `src/features/products/
  ├── index.js                  # registers components + exports routes
  ├── views/
  │   └── products.html         # markup only (no logic, no styles)
  ├── styles/
  │   └── products.css          # styles only (uses tokens from tokens.css)
  └── viewModels/
      └── products.js           # logic only (observables + methods)`,
        },
        {
          title: 'Write the template (HTML)',
          body:
            'Templates contain only markup and Knockout bindings — never any ' +
            'inline JavaScript. Save this as <code>views/products.html</code>:',
          code:
  `<section class="products">
    <h1 class="products__title">Products</h1>
    <ul class="products__list" data-bind="foreach: items">
      <li class="products__item" data-bind="text: name"></li>
    </ul>
  </section>`,
        },
        {
          title: 'Write the styles (CSS)',
          body:
            'Use the design tokens from <code>tokens.css</code> for colors and ' +
            'spacing. Save this as <code>styles/products.css</code>:',
          code:
  `.products       { max-width: 720px; margin: 0 auto; padding: var(--space-xl); }
  .products__title { font-size: 1.75rem; margin-bottom: var(--space-md); }
  .products__list  { list-style: none; padding: 0; }
  .products__item  {
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    margin-bottom: var(--space-xs);
    background: var(--color-surface);
  }`,
        },
        {
          title: 'Write the view-model (JS)',
          body:
            'A view-model is a plain class that exposes observables and methods. ' +
            'It never touches the DOM. Save as <code>viewModels/products.js</code>:',
          code:
  `import ko from 'knockout';
  
  class ProductsVM {
    constructor(/* params */) {
      this.items = ko.observableArray([
        { name: 'Acme Widget' },
        { name: 'Acme Gadget' },
      ]);
    }
  }
  
  export default ProductsVM;`,
        },
        {
          title: 'Register the component + route',
          body:
            'Tie everything together in the feature\'s <code>index.js</code>, ' +
            'then add the export to <code>src/app/config/navigation.js</code>:',
          code:
  `// src/features/products/index.js
  import ko from 'knockout';
  import productsHtml from './views/products.html?raw';
  import ProductsVM   from './viewModels/products.js';
  import './styles/products.css';
  
  ko.components.register('products-page', {
    template: productsHtml,
    viewModel: { createViewModel: (params) => new ProductsVM(params) },
  });
  
  export const productsRoutes = [
    { path: '/products', component: 'products-page' },
  ];
  
  // src/app/config/navigation.js
  import { productsRoutes } from '../../features/products/index.js';
  
  const routes = [
    ...homeRoutes,
    ...productsRoutes,   // add this line
  ];`,
        },
        {
          title: 'Add it to the header menu',
          body:
            'Open <code>src/ui/components/site-header/site-header.js</code> and ' +
            'append a new entry to the <code>menu</code> array:',
          code:
  `this.menu = [
    { path: '/',         label: 'Home' },
    { path: '/tutorial', label: 'Tutorial' },
    { path: '/products', label: 'Products' },   // ← new line
    ...
  ];`,
        },
        {
          title: 'Run it',
          body:
            'Save and visit <code>http://localhost:5173/#/products</code>. ' +
            'Vite hot-reloads on save, so the new page appears instantly.',
          code: null,
        },
      ];
    }
  }
  
  export default TutorialVM;